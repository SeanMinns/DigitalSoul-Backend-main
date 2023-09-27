const User = require("../../../models/user");

const addSet2 = async (req, res) => {
  try {
    const id = req.body.id;
    const answers = req.body.setAnswers;
    const user = await User.get(id, {
      attributes: ["setAnswers"],
    });
    const jsonUser = user.toJSON();
    jsonUser.setAnswers.set2 = answers;
    User.update(
      {
        id: id,
      },
      {
        $SET: {
          setAnswers: jsonUser.setAnswers,
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

module.exports = addSet2;
