import express from "express"
import cors from "cors"
import tasks from "./api/tasks.route.js"
import auth from "./api/auth.route.js"
import bodyParser from "body-parser"
import User from "./models/user.js"
import Task from "./models/task.js"
import TaskController from "./api/tasks.controller.js"

const app = express()

app.set("view engine", "ejs");
app.use(express.static('../frontend/public'));
app.use(express.json())
app.use(express.urlencoded());
app.use(cors())

app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({   
  extended: true
})); 

// to check for reminders- setInterval(TaskController.sendReminder,100000)

app.get("/",  (req, res) => {
  res.render("signup");
});

app.get("/login",  (req, res) => {
  res.render('login');
});

app.get("/index/:emailId",  (req, res) => {
  res.render("index");
});

app.get("/task/:taskId",  (req, res) => {
  res.render("task");
});

app.use("/api/v1/tasks",tasks)
app.use("/api/v1/auth",auth)

export default app
