const User = require("../../models/user");

const checkSets = async (req, res) => {
  try {
    const id = req.body.id;
    const user = await User.get(id, {
      attributes: ["setAnswers", "isRegistered", "initialQuestions"],
    });
    const jsonUser = user.toJSON();
    if (jsonUser.initialQuestions.length === 0) {
      res.status(200).json({
        code: 1,
        initialQuestions: false,
      });
    } else {
      if (jsonUser.isRegistered) {
        res.status(200).json({
          code: 1,
          setsCompleted: [1, 2, 3, 4, 5, 6],
          initialQuestions: true,
        });
      } else {
        if (!jsonUser.setAnswers.set1.length) {
          console.log(1);
          res.status(200).json({
            code: 1,
            setsCompleted: [],
            initialQuestions: true,
          });
        } else if (!jsonUser.setAnswers.set2.length) {
          console.log(2);
          res.status(200).json({
            code: 1,
            setsCompleted: [1],
            initialQuestions: true,
          });
        } else if (!jsonUser.setAnswers.set3.length) {
          console.log(3);
          res.status(200).json({
            code: 1,
            setsCompleted: [1, 2],
            initialQuestions: true,
          });
        } else if (!jsonUser.setAnswers.set4.length) {
          console.log(4);
          res.status(200).json({
            code: 1,
            setsCompleted: [1, 2, 3],
            initialQuestions: true,
          });
        } else if (!jsonUser.setAnswers.set5.length) {
          console.log(5);
          res.status(200).json({
            code: 1,
            setsCompleted: [1, 2, 3, 4],
            initialQuestions: true,
          });
        } else if (!jsonUser.setAnswers.set6.length) {
          console.log(6);
          res.status(200).json({
            code: 1,
            setsCompleted: [1, 2, 3, 4, 5],
            initialQuestions: true,
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      code: 0,
      error: error,
    });
  }
};

module.exports = checkSets;
