import express from "express"
import TaskController from "./tasks.controller.js"

const router = express.Router()

router
  .route("/:emailId")
  .post(TaskController.createTask)
  .get(TaskController.getAllTasks)

router.route("/one/:id")
   .get(TaskController.getTask)
   .put(TaskController.updateTask)
   .delete(TaskController.deleteTask)

export default router
