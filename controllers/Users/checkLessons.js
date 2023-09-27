const User = require("../../models/user");

const checkLessons = async (req, res) => {
  try {
    const id = req.body.id;
    const user = await User.get(id, {
      attributes: ["lessonAnswers"],
    });
    const jsonUser = user.toJSON();
    const lessonsCompleted = [];
    if (jsonUser.lessonAnswers.lesson1 && jsonUser.lessonAnswers.lesson1.length) {
      lessonsCompleted.push(1);
    } if (jsonUser.lessonAnswers.lesson2 && jsonUser.lessonAnswers.lesson2.length) {
      lessonsCompleted.push(2);
    } if (jsonUser.lessonAnswers.lesson3 && jsonUser.lessonAnswers.lesson3.length) {
      lessonsCompleted.push(3);
    } if (jsonUser.lessonAnswers.lesson4 && jsonUser.lessonAnswers.lesson4.length) {
      lessonsCompleted.push(4);
    } if (jsonUser.lessonAnswers.lesson5 && jsonUser.lessonAnswers.lesson5.length) {
      lessonsCompleted.push(5);
    }
    res.status(200).json({
        code: 1,
        lessonsCompleted: lessonsCompleted
    });
  } catch (error) {
    res.status(400).json({
      code: 0,
      error: error,
    });
  }
};

module.exports = checkLessons;