'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

module.exports.handler = async event => {
  let message = JSON.parse(event.Records[0].Sns.Message);

  message.id = event.Records[0].Sns.MessageId;

  try {
    const result = await dynamo.put({
      TableName: process.env.MESSAGE_TABLE,
      Item: message
    }).promise();
  } catch (error) {
    return {error: `Could not save: ${error.stack}`};
  }

  return {message: "Saved"};
};
