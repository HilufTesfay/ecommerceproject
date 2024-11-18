const express = require("express");
const { auth } = require("../../middleware");
const { customer } = require("../../conrollers");
const Router = express.Router();

Router.route("/login").get(customer.sendLoginForm).post(auth.authenticateUser);
Router.route("/logout").post(auth.isAuthenticatedUser, auth.logOut);
module.exports = Router;
