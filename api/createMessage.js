'use strict';

const AWS = require('aws-sdk');
const sns = new AWS.SNS({apiVersion: '2010-03-31'})
const querystring = require('querystring');

module.exports.handler = async event => {
  const email = event.requestContext.authorizer.claims.email;
  let params = querystring.decode(event.body);

  params.created = Date.now();
  params.from = email;

  const message = {
    Message: JSON.stringify(params),
    MessageAttributes: {
        type: {DataType: 'String', StringValue: params.type}
    },
    TopicArn: process.env.MESSAGE_TOPIC_ARN
  };

  const result = await sns.publish(message).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({message: 'Message received', result})
  };
};
