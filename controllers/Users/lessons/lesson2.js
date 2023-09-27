const User = require("../../../models/user");

const addLesson2 = async (req, res) => {
  try {
    const id = req.body.id;
    const answers = req.body.lesson2Answers;
    const user = await User.get(id, {
      attributes: ["lessonAnswers"],
    });
    const jsonUser = user.toJSON();
    const lesson2Answers = jsonUser.lessonAnswers.lesson2;
    let answerNumber = 0;
    if (lesson2Answers.length === 0) {
      answerNumber = 1;
    } else {
      lesson2Answers.forEach((answer) => {
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
    jsonUser.lessonAnswers.lesson2.push(answer);
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

module.exports = addLesson2;
