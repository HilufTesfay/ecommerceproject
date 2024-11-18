const express = require("express");
const { admin } = require("../../conrollers");
const { auth } = require("../../middleware");
const Router = express.Router();
Router.route("/")
  .post(admin.createAdmin) //
  .put(auth.isAuthenticatedUser, auth.authorize("admin"), admin.updateMyAcount);
module.exports = Router;
