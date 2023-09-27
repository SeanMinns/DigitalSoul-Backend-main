const User = require("../../../models/user");

const getNotes = (req, res) => {
  try {
    const id = req.body.id;
    User.query("id")
      .eq(id)
      .attributes(["diaryEntries"])
      .exec((err, entries) => {
        if (err) {
          res.status(400).json({
            code: 0,
            error: error,
          });
        } else {
          res.status(200).json({
            code: 1,
            entries: entries[0].diaryEntries,
          });
        }
      });
  } catch (error) {
    res.status(401).json({
      code: 0,
      error: error,
    });
  }
};

module.exports = getNotes;
