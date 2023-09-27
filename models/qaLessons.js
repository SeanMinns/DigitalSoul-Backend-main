const Joi = require("joi");

const QuestionAnswersLesson = Joi.object({
  answers: Joi.array().items({
    answerNumber: Joi.number(),
    answers: Joi.array().items({
      question: Joi.string(),
      answer: Joi.string(),
      timeTaken: Joi.string(),
    }),
  }),
});

module.exports = QuestionAnswersLesson;
