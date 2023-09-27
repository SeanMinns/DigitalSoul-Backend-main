const Category = require("../../models/category");
// const uuidv4 = require("uuid/v4");

const createNewCategory = async (req, res) => {
  try {
    var category = req.body.category;
    await category.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.send(error);
  }
};

module.exports = createNewCategory;
