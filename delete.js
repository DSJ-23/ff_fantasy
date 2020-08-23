'use strict';

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
const postsTable = process.env.POSTS_TABLE;

function response(statusCode, message) {
    return {
      statusCode: statusCode,
      body: JSON.stringify(message)
    };
}

module.exports.deletePost = (event, context, callback) => {
    const id = event.pathParameters.id;
    const params = {
      Key: {
        id: id
      },
      TableName: postsTable
    };
    return db
      .delete(params)
      .promise()
      .then(() =>
        callback(null, response(200, { message: 'Post deleted successfully' }))
      )
      .catch((err) => callback(null, response(err.statusCode, err)));
};


