const express = require("express");
const { validate } = require("../../middleware");
const { authValidation, customerValidation } = require("../../validations");
const { auth } = require("../../conrollers");
const Router = express.Router();
Router.route("/register").post(
  validate(customerValidation.createUser),
  auth.registerAdmin
); //post v1/auth/register api regeister user as admin
Router.route("/login")
  .get(auth.sendLoginForm) //get v1/auth/login api to return login form
  .post(validate(authValidation.logIn), auth.logInUser); //post v1/auth/login api to login user
Router.route("/logout").post(validate(authValidation.logout), auth.logOutUser); //post v1/auth/logout api to logout user
Router.route("/refresh-token").get(
  validate(authValidation.refreshToken),
  auth.refreshAuth
); //get v1/auth/refresh-token api to request referesh token
module.exports = Router;
