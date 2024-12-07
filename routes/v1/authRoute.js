const express = require("express");
const { validate } = require("../../middleware");
const { authValidation } = require("../../validations");
const { auth } = require("../../conrollers");
const Router = express.Router();

Router.route("/login")
  .get(auth.sendLoginForm)
  .post(validate(authValidation.logInUser), auth.logInUser);
Router.route("/logout").post(auth.logOutUser);
Router.route("/refresh-token").get(auth.refreshAuth);
module.exports = Router;
