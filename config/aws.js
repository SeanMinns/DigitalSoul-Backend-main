require("dotenv").config();
const dynamo = require("dynamodb");

dynamo.AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

module.exports = dynamo;
