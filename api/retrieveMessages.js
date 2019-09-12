'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

module.exports.handler = async event => {
  const email = event.requestContext.authorizer.claims.email;

  const params = {
    ExpressionAttributeValues: {':to': email},
    ExpressionAttributeNames: {'#to': 'to'},
    KeyConditionExpression: "#to = :to",
    TableName: process.env.MESSAGE_TABLE,
    IndexName: process.env.MESSAGE_TABLE_INDEX
  };

  const messages = await dynamo.query(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({messages})
  };
};
