const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const moment = require("moment");
const compression = require("compression");
const dynamoose = require("dynamoose");
var AWSXRay = require('aws-xray-sdk');


const limiter = rateLimit({
  windowMs: 1000,
  max: 10,
});

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

app.use(limiter);
app.use(AWSXRay.express.openSegment('MyApp'));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use(
  morgan(function (tokens, req, res) {
    return [
      moment().format("LLL"),
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

app.set("view engine", "ejs");

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.render("privacypolicy");
});

const questionRoute = require("./routes/questionRoute");
app.use("/api/questions", questionRoute);

const userRoute = require("./routes/userRoute");
app.use("/api/users", userRoute);

const adminRoute = require("./routes/adminRoutes");
app.use("/api/admin", adminRoute);

app.use(AWSXRay.express.closeSegment());

app.get("/privacyPolicy", (req, res) => {
  res.render("privacypolicy");
});
app.use(express.static('public'))

app.listen(PORT, () => {
  console.log("App is up and running on port " + PORT);
});
