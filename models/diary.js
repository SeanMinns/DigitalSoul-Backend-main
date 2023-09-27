const Joi = require("joi");

const Diary = Joi.object({
    dateTime: Joi.string(),
    prayerType: Joi.string(),
    feelingBefore: Joi.string(),
    feelingAfter: Joi.string(),
    stressBefore: Joi.string(),
    stressAfter: Joi.string(),
    prayer: Joi.string(),
    notes: Joi.string(),
});

module.exports = Diary;