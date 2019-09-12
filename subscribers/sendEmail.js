'use strict';

const AWS = require('aws-sdk');
const ses = new AWS.SES({apiVersion: '2010-12-01'});

module.exports.handler = async event => {
  const message = JSON.parse(event.Records[0].Sns.Message);

  const params = {
    Destination: {
      ToAddresses: [message.to]
    },
    Source: message.from,
    Template: process.env.MESSAGE_TEMPLATE,
    TemplateData: JSON.stringify({text:message.message})
  };

  try {
    const result = await ses.sendTemplatedEmail(params).promise();

    return {result};
  } catch (error) {
    console.log(error);

    return {error};
  }
};
