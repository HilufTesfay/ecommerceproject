const express = require("express");
const { customerAuth } = require("../../middleware");
const Router = express.Router();

Router.route("/login")
  .get(customerAuth.sendLoginForm)
  .post(customerAuth.authenticateCustomer);
Router.route("/profile").get(
  customerAuth.isAuthenticatedCustomer,
  customerAuth.getProfile
);
Router.route("/logout").post(
  customerAuth.isAuthenticatedCustomer,
  customerAuth.logOut
);
module.exports = Router;
