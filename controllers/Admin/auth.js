const jwt = require("jsonwebtoken");
const moment = require("moment");
const checkers = require("../../utilities/checkers");

const genAuthToken = (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!checkers.stringValue(username) || !checkers.stringValue(password)) {
      res.status(400).json({
        code: 0,
        error:
          "Username or password is not a String. Please send String values",
      });
    } else {
      if (username === "DSadmin") {
        if (password === "SoulKing95") {
          console.log(
            moment().utcOffset(330).format("YYYY-MM-DDTHH:mm:ss.SSS")
          );
          const token = jwt.sign(
            {
              expiresAt: moment()
                .utcOffset(330)
                .add(5, "m")
                .format("YYYY-MM-DDTHH:mm:ss.SSS"),
            },
            process.env.JWT_ADMIN_SECRET_KEY
          );
          res.status(200).json({
            code: 1,
            message: "Authentication successful",
            token: token,
          });
        }
      } else {
        res.status(200).json({
          code: 0,
          error: "Incorrect username or password",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      code: 0,
      error: error,
    });
  }
};

module.exports = genAuthToken;
