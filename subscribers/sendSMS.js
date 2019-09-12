'use strict';

const AWS = require('aws-sdk');
const sns = new AWS.SNS({apiVersion: '2010-03-31'});

module.exports.handler = async event => {
  const message = JSON.parse(event.Records[0].Sns.Message);

  const params = {
    Message: message.message,
    PhoneNumber: message.to,
  };

  try  {
    const result = await sns.publish(params).promise();

    return {result};
  } catch(error) {
    console.log(error);

    return {error}
  }
};
