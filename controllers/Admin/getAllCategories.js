const Category = require("../../models/category");

const getAllCategories = (req, res) => {
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
              res.status(200).json({
                code: 1,
                data: arr
              });
            }
          });
      } catch (error) {
        res.status(400).json({
          code: 0,
          error: error
        });
      }
};

module.exports = getAllCategories;