const express = require("express");
const { auth } = require("../../middleware");
const Router = express.Router();
const { customer } = require("../../conrollers");
Router.route("/email").get(
  auth.authorize("admin"),
  auth.isAuthenticatedUser,
  customer.searchByEmail
); // get v1/customers/search/email search customer by email
Router.route("/phone").get(
  auth.authorize("admin"),
  auth.isAuthenticatedUser,
  customer.searchByPhone
); //get v1/customers/search/phone search customer by phoneNumber
module.exports = Router;
