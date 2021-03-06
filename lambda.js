const awsLambdaFastify = require('aws-lambda-fastify');
const app = require('./dist/server');

const proxy = awsLambdaFastify(app);

exports.handler = (event, context, callback) => {
  console.log('event :>> ', event);
  context.callbackWaitsForEmptyEventLoop = false;
  proxy(event, context, callback);
};
