const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({
  id: String,
  email: String,
  isRegistered: Boolean,
  uniqueIdentifier: String,
  suicidalWordsUsed: {
    type: Array,
    schema: [{ type: String }],
  },
  initialQuestions: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          question: String,
          answer: String,
        },
      },
    ],
  },
  setAnswers: {
    type: Object,
    schema: {
      set1: {
        type: Array,
        schema: [
          {
            type: Object,
            schema: {
              question: String,
              answer: String,
              timeTaken: String,
            },
          },
        ],
      },
      set2: {
        type: Array,
        schema: [
          {
            type: Object,
            schema: {
              question: String,
              answer: String,
              timeTaken: String,
            },
          },
        ],
      },
      set3: {
        type: Array,
        schema: [
          {
            type: Object,
            schema: {
              question: String,
              answer: String,
              timeTaken: String,
            },
          },
        ],
      },
      set4: {
        type: Array,
        schema: [
          {
            type: Object,
            schema: {
              question: String,
              answer: String,
              timeTaken: String,
            },
          },
        ],
      },
      set5: {
        type: Array,
        schema: [
          {
            type: Object,
            schema: {
              question: String,
              answer: String,
              timeTaken: String,
            },
          },
        ],
      },
      set6: {
        type: Array,
        schema: [
          {
            type: Object,
            schema: {
              question: String,
              answer: String,
              timeTaken: String,
            },
          },
        ],
      },
    },
  },
  diaryEntries: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          noteId: String,
          date: String,
          timeTakenForThirdField: String,
          time: String,
          prayerType: String,
          feelingBefore: String,
          feelingAfter: String,
          stressBefore: String,
          stressAfter: String,
          prayer: String,
          notes: String,
        },
      },
    ],
  },
  lessonAnswers: {
    type: Object,
    schema: {
      lesson1: {
        type: Array,
        schema: [
          {
            type: Object,
            schema: {
              answerNumber: Number,
              answers: {
                type: Array,
                schema: [
                  {
                    type: Object,
                    schema: {
                      question: String,
                      answer: String,
                      timeTaken: String,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      lesson2: {
        type: Array,
        schema: [
          {
            type: Object,
            schema: {
              answerNumber: Number,
              answers: {
                type: Array,
                schema: [
                  {
                    type: Object,
                    schema: {
                      question: String,
                      answer: String,
                      timeTaken: String,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      lesson3: {
        type: Array,
        schema: [
          {
            type: Object,
            schema: {
              answerNumber: Number,
              answers: {
                type: Array,
                schema: [
                  {
                    type: Object,
                    schema: {
                      question: String,
                      answer: String,
                      timeTaken: String,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      lesson4: {
        type: Array,
        schema: [
          {
            type: Object,
            schema: {
              answerNumber: Number,
              answers: {
                type: Array,
                schema: [
                  {
                    type: Object,
                    schema: {
                      question: String,
                      answer: String,
                      timeTaken: String,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      lesson5: {
        type: Array,
        schema: [
          {
            type: Object,
            schema: {
              answerNumber: Number,
              answers: {
                type: Array,
                schema: [
                  {
                    type: Object,
                    schema: {
                      question: String,
                      answer: String,
                      timeTaken: String,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
});

const User = dynamoose.model("Users", schema);

module.exports = User;
