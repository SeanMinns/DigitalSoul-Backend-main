const Category = require("../../models/category");
const checkers = require("../../utilities/checkers");

const update = (req, res) => {
  try {
    const reqId = req.body.id;
    const reqChanges = req.body.changes;
    if (!checkers.stringValue(reqId)) {
      res.status(400).json({
        code: 0,
        error: "ID is not a valid string",
      });
    } else {
      if (reqChanges.changeType === "before") {
        if (checkers.arrayValue(reqChanges.before)) {
          Category.update(
            {
              id: reqId,
              before: reqChanges.before,
            },
            (err, category) => {
              if (err) {
                res.status(400).json({
                  code: 0,
                  error: err.message,
                });
              } else {
                res.status(200).json({
                  code: 1,
                  message: "Updated successfully",
                });
              }
            }
          );
        } else {
          res.status(400).json({
            code: 0,
            error: "Invalid Format for array",
          });
        }
      } else if (reqChanges.changeType === "after") {
        if (checkers.arrayValue(reqChanges.after)) {
          Category.update(
            {
              id: reqId,
              after: reqChanges.after,
            },
            (err, category) => {
              if (err) {
                res.status(400).json({
                  code: 0,
                  error: err.message,
                });
              } else {
                res.status(200).json({
                  code: 1,
                  message: "Updated successfully",
                });
              }
            }
          );
        } else {
          res.status(400).json({
            code: 0,
            error: "Invalid Format for array",
          });
        }
      } else if (reqChanges.changeType === "name") {
        if (checkers.stringValue(reqChanges.name)) {
          Category.update(
            {
              id: reqId,
              name: reqChanges.name,
            },
            (err, category) => {
              if (err) {
                res.status(400).json({
                  code: 0,
                  error: err.message,
                });
              } else {
                res.status(200).json({
                  code: 1,
                  message: "Updated successfully",
                });
              }
            }
          );
        } else {
          res.status(400).json({
            code: 0,
            error: "Invalid Format for name",
          });
        }
      } else if (reqChanges.changeType === "videoLink") {
        if (checkers.arrayValue(reqChanges.videoLink)) {
          Category.update(
            {
              id: reqId,
              videoLink: reqChanges.videoLink,
            },
            (err, category) => {
              if (err) {
                res.status(400).json({
                  code: 0,
                  error: err.message,
                });
              } else {
                res.status(200).json({
                  code: 1,
                  message: "Updated successfully",
                });
              }
            }
          );
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

module.exports = update;
