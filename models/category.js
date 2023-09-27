const dynamo = require("../config/aws");
const Joi = require("joi");
const Question = require("./question");

const Category = dynamo.define("Question", {
  hashKey: "id",
  schema: {
    id: Joi.string(),
    name: Joi.string(),
    before: Joi.array().items(Question),
    videoLink: dynamo.types.stringSet(),
    after: Joi.array().items(Question),
  },
  tableName: process.env.QUESTION_TABLE_NAME,
});

module.exports = Category;
