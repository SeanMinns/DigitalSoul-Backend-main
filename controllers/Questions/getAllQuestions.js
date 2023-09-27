const Category = require("../../models/category");

const getQuestions = (req, res) => {
  try {
    Category.scan()
      .loadAll()
      .exec((err, data) => {
        if (err) {
          console.log("Error running scan", err);
          res.send(err);
        } else {
          var arr = [];
          data.Items.forEach((item) => {
            arr.push(item.get());
          });
          res.send(arr);
        }
      });
  } catch (error) {
    res.send(err);
  }
};

module.exports = getQuestions;
