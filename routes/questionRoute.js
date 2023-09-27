const app = require("express")();
const createNewCategory = require("../controllers/Questions/addCategory");
const getQuestions = require("../controllers/Questions/getAllQuestions");

app.get("/add", createNewCategory);
app.get("/all", getQuestions);

module.exports = app;
