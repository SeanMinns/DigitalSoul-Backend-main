const User = require("../../../models/user");

const addLesson1 = async (req, res) => {
  try {
    const id = req.body.id;
    const answers = req.body.lesson1Answers;
    const user = await User.get(id, {
      attributes: ["lessonAnswers"],
    });
    const jsonUser = user.toJSON();
    console.log(jsonUser);
    const lesson1Answers = jsonUser.lessonAnswers.lesson1;
    let answerNumber = 0;
    if (lesson1Answers.length === 0) {
      answerNumber = 1;
    } else {
      lesson1Answers.forEach((answer) => {
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
    console.log(answer);
    jsonUser.lessonAnswers.lesson1.push(answer);
    console.log(jsonUser);
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
          console.log(user);
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

module.exports = addLesson1;
