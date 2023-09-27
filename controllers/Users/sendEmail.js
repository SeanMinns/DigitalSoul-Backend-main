const ses = require("node-ses");
const checkers = require("../../utilities/checkers");
const client = ses.createClient({
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY,
});

const sendEmail = (req, res) => {
  try {
    const email = req.body.email;
    const message = req.body.message;
    if (!checkers.stringValue(email) || !checkers.stringValue(message)) {
      res.status(400).json({
        code: 0,
        error: "Email or message is not a String",
      });
    } else {
      client.sendEmail(
        {
          to: "digitalsoulharvard@gmail.com",
          from: "digitalsoulharvard@gmail.com",
          subject: "New email from Digital Soul App User",
          message: "You have a new message from " + email + ":\n" + message,
        },
        (err, data, result) => {
          if (err) {
            res.status(400).json({
              code: 0,
              error: err,
            });
          } else {
            res.status(200).json({
              code: 1,
              message: "Your email has been sent",
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

module.exports = sendEmail;
