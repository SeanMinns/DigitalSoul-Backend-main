const Joi = require("joi");

const QuestionAnswersSet = Joi.object({
  question: Joi.string(),
  answer: Joi.string(),
  timeTaken: Joi.string(),
});

module.exports = QuestionAnswersSet;
