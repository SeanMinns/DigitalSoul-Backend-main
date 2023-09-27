const User = require("../../../models/user");
const uuidv4 = require("uuid");

const addNote = (req, res) => {
  try {
    const id = req.body.id;
    const diaryData = req.body.diary;
    diaryData["noteId"] = uuidv4();
    User.update(
      {
        id: id,
      },
      {
        $ADD: {
          diaryEntries: diaryData,
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

module.exports = addNote;
