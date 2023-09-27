const app = require("express")();
const genAuthToken = require("../controllers/Users/genToken");
const register = require("../controllers/Users/register");
const checkers = require("../utilities/checkers");
const getNotes = require("../controllers/Users/notes/getNotes");
const addNote = require("../controllers/Users/notes/addNote");
const editNote = require("../controllers/Users/notes/editNote");
const initialQuestions = require("../controllers/Users/initialQuestions")
const addSet1 = require("../controllers/Users/sets/set1");
const addSet2 = require("../controllers/Users/sets/set2");
const addSet3 = require("../controllers/Users/sets/set3");
const addSet4 = require("../controllers/Users/sets/set4");
const addSet5 = require("../controllers/Users/sets/set5");
const addSet6 = require("../controllers/Users/sets/set6");
const addLesson1 = require("../controllers/Users/lessons/lesson1");
const addLesson2 = require("../controllers/Users/lessons/lesson2");
const addLesson3 = require("../controllers/Users/lessons/lesson3");
const addLesson4 = require("../controllers/Users/lessons/lesson4");
const addLesson5 = require("../controllers/Users/lessons/lesson5");
const sendEmail = require("../controllers/Users/sendEmail")
const checkSetsStatus = require("../controllers/Users/checkSets");
const checkLessonsStatus = require("../controllers/Users/checkLessons");
const addSuicideWords = require("../controllers/Users/addSuicideWords");


app.post("/genAuthToken", genAuthToken);
app.post("/register", register);
app.post("/notes/getAll", checkers.jwtAuthentication, getNotes);
app.post("/notes/addNote", checkers.jwtAuthentication, addNote);
app.post("/notes/editNote", checkers.jwtAuthentication, editNote);
app.post("/addInitialQuestions", checkers.jwtAuthentication, initialQuestions);
app.post("/sets/add/1", checkers.jwtAuthentication, addSet1);
app.post("/sets/add/2", checkers.jwtAuthentication, addSet2);
app.post("/sets/add/3", checkers.jwtAuthentication, addSet3);
app.post("/sets/add/4", checkers.jwtAuthentication, addSet4);
app.post("/sets/add/5", checkers.jwtAuthentication, addSet5);
app.post("/sets/add/6", checkers.jwtAuthentication, addSet6);
app.post("/lessons/add/1", checkers.jwtAuthentication, addLesson1);
app.post("/lessons/add/2", checkers.jwtAuthentication, addLesson2);
app.post("/lessons/add/3", checkers.jwtAuthentication, addLesson3);
app.post("/lessons/add/4", checkers.jwtAuthentication, addLesson4);
app.post("/lessons/add/5", checkers.jwtAuthentication, addLesson5);
app.post("/sendEmail", checkers.jwtAuthentication, sendEmail);
app.post("/checkSetsStatus", checkers.jwtAuthentication, checkSetsStatus);
app.post("/checkLessonsStatus", checkers.jwtAuthentication, checkLessonsStatus);
app.post("/addSuicideWords", checkers.jwtAuthentication, addSuicideWords);

module.exports = app;
