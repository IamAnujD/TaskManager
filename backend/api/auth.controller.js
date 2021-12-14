import User from "../models/user.js"
import Alert from "alert"

export default class AuthController {
  static async login(req, res, next) {
    try {
      const { emailId , password }  = req.query
      const user = await User.findOne({emailId: emailId})
      if (!user) {
          res.render("login", {errorMessage: 'Invalid Id or Password'})
            }
      if(user.password !== password) {res.render("login", {errorMessage: 'Invalid Id or Password'}) }
      res.redirect(`/index/${emailId}`);
    } catch (e) {
      res.render("login", {errorMessage: 'Invalid Id or Password'})
    }
  }

   static async register(req, res, next) {
    try {
      const { name, emailId , password }  = req.body
      const check = await User.findOne({emailId: emailId})
      if(check )  res.render("signup", {errorMessage: 'Already registererd'})
      const user = await User.create(req.body)
      res.redirect(`/index/${emailId}`);
    } catch (e) {
      res.render("signup", {errorMessage: 'Already registered'})
    }
  }


}
