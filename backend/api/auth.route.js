import express from "express"
import AuthController from "./auth.controller.js"

const router = express.Router()

router
  .route("/login")
  .get(AuthController.login)

router
   .route("/register")
   .post(AuthController.register)


export default router
