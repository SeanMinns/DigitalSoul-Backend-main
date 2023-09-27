const User = require("../../../models/user");

const addLesson3 = async (req, res) => {
  try {
    const id = req.body.id;
    const answers = req.body.lesson3Answers;
    const user = await User.get(id, {
      attributes: ["lessonAnswers"],
    });
    const jsonUser = user.toJSON();
    const lesson3Answers = jsonUser.lessonAnswers.lesson3;
    let answerNumber = 0;
    if (lesson3Answers.length === 0) {
      answerNumber = 1;
    } else {
      lesson3Answers.forEach((answer) => {
        if (answer.answerNumber > answerNumber) {
          answerNumber = answer.answerNumber;
        }
      });
      answerNumber++;
    }
    const answer = {
      answerNumber: answerNumber,
      answers: answers,
    };
    jsonUser.lessonAnswers.lesson3.push(answer);
    User.update(
      {
        id: id,
      },
      {
        $SET: {
          lessonAnswers: jsonUser.lessonAnswers,
        },
      },
      (err, user) => {
        if (err) {
          res.status(400).json({
            code: 0,
            error: err,
          });
        } else {
          res.status(200).json({
            code: 1,
            message: "Successfully added",
          });
        }
      }
    );
  } catch (error) {
    res.status(400).json({
      code: 0,
      error: error,
    });
  }
};

module.exports = addLesson3;
