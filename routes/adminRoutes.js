const app = require("express")();
const genAuthToken = require("../controllers/Admin/auth");
const getAllCategories = require("../controllers/Admin/getAllCategories");
const update = require("../controllers/Admin/update");
const checkers = require("../utilities/checkers");
const getCSV = require("../controllers/Admin/getCsv");

app.post("/login", genAuthToken);
app.get("/getAllCategories", checkers.jwtAdminAuthentication, getAllCategories);
app.post("/update", checkers.jwtAdminAuthentication, update);
app.post("/getCSV", checkers.jwtAdminAuthentication, getCSV);

module.exports = app;
