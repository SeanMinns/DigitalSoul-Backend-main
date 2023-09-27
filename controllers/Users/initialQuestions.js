const User = require("../../models/user");
const checkers = require("../../utilities/checkers");

const addInitialQuestions = (req, res) => {
  try {
    const id = req.body.id;
    const iq = req.body.initialQuestions;
    if (!checkers.arrayValue(iq)) {
      res.status(400).json({
        code: 0,
        error: "Initial Questions is not an array",
      });
    } else {
      User.update(
        {
          id: id,
        },
        {
          $SET: {
            initialQuestions: iq,
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
    }
  } catch (error) {
    res.status(400).json({
      code: 0,
      error: error,
    });
  }
};

module.exports = addInitialQuestions;
