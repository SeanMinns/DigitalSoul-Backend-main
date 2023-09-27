const jwt = require("jsonwebtoken");
const checkers = require("../../utilities/checkers");
const moment = require("moment");
const User = require("../../models/user");

const genAuthToken = (req, res) => {
  try {
    const user = req.body.user;
    if (!checkers.stringValue(user.id) || !checkers.stringValue(user.email)) {
      res.status(400).json({
        code: 0,
        error: "Id or email is not a string",
      });
    } else {
      User.query("id")
        .eq(user.id)
        .exec((err, u) => {
          if (err) {
            return res.status(400).json({
              code: 0,
              error: err,
            });
          } else if (u.length === 0) {
            return res.status(400).json({
              code: 0,
              error: "User not found",
            });
          } else {
            const token = jwt.sign(
              {
                id: user.id,
                email: user.email,
                createdAt: moment(),
              },
              process.env.JWT_SECRET_KEY
            );
            res.status(200).json({
              code: 1,
              message: "Token generated successfully",
              token: token,
            });
          }
        });
    }
  } catch (error) {
    res.status(400).json({
      code: 0,
      error: error,
    });
  }
};

module.exports = genAuthToken;
