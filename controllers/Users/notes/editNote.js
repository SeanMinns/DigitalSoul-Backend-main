const User = require("../../../models/user");

const editNote = async (req, res) => {
  try {
    const id = req.body.id;
    const diaryData = req.body.diary;
    const user = await User.get(id, {
      attributes: ["diaryEntries"],
    });
    const jsonUser = user.toJSON();
    const index = jsonUser.diaryEntries.findIndex(
      (entry) => entry.noteId === diaryData.noteId
    );
    jsonUser.diaryEntries[index].notes = diaryData.notes;
    await User.update(
      {
        id: id,
      },
      {
        $SET: {
          diaryEntries: jsonUser.diaryEntries,
        },
      }
    );
    res.status(200).json({
      code: 1,
      message: "Done!",
    });
  } catch (error) {
    res.status(400).json({
      code: 0,
      error: error,
    });
  }
};

module.exports = editNote;
