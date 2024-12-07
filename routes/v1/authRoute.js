const express = require("express");
const { validate } = require("../../middleware");
const { authValidation } = require("../../validations");
const { auth } = require("../../conrollers");
const Router = express.Router();
Router.route("/register").post(
  validate(authValidation.register),
  auth.registerAdmin
);
Router.route("/login")
  .get(auth.sendLoginForm)
  .post(validate(authValidation.logIn), auth.logInUser);
Router.route("/logout").post(validate(authValidation.logout), auth.logOutUser);
Router.route("/refresh-token").get(
  validate(authValidation.refreshToken),
  auth.refreshAuth
);
module.exports = Router;
