const Joi = require("joi");

const Question = Joi.object({
  questionId: Joi.string(),
  questionType: Joi.string(),
  questionContent: Joi.string(),
  questionOptions: Joi.array().items(
    Joi.object({
      id: Joi.number(),
      name: Joi.string(),
    })
  ),
});

module.exports = Question;
