const User = require("../../models/user");
const checkers = require("../../utilities/checkers");

const addSuicideWords = (req, res) => {
  try {
    const id = req.body.id;
    const data = req.body.data;
    if (!checkers.stringValue(data)) {
      res.status(400).json({
        code: 0,
        message: "Input is not a String",
      });
    } else {
      console.log(data);
      User.update(
        {
          id: id,
        },
        {
          $ADD: {
            suicidalWordsUsed: data,
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

module.exports = addSuicideWords;
