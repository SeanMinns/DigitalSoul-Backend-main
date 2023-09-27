const User = require("../../models/user");
const checkers = require("../../utilities/checkers");

const register = (req, res) => {
  try {
    const id = req.body.id;
    const email = req.body.email;
    const uniqueIdentifier = req.body.uniqueIdentifier;
    if (!checkers.stringValue(id) || !checkers.stringValue(email)) {
      res.status(400).json({
        code: 0,
        error: "Id or email is not a string",
      });
    } else {
      const user = new User(
        {
          id: id,
          email: email,
          uniqueIdentifier: uniqueIdentifier,
          suicidalWordsUsed: [],
          isRegistered: false,
          initialQuestions: [],
          setAnswers: {
            set1: [],
            set2: [],
            set3: [],
            set4: [],
            set5: [],
            set6: [],
          },
          diaryEntries: [],
          lessonAnswers: {
            lesson1: [],
            lesson2: [],
            lesson3: [],
            lesson4: [],
            lesson5: [],
          },
        },
        {
          allowEmptyArray: true,
        }
      );
      user.save((err) => {
        if (err) {
          res.status(400).json({
            code: 0,
            error: "Error: " + err,
          });
        } else {
          res.status(200).json({
            code: 1,
            message: "Successfully registered",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 0,
      error: error,
    });
  }
};

module.exports = register;
