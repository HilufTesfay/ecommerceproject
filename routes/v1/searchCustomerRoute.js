const express = require("express");
const { auth, validate } = require("../../middleware");
const { customerValidation } = require("../../validations");
const Router = express.Router();
const { customer } = require("../../conrollers");
Router.route("/email").get(
  auth.authorize("admin"),
  auth.isAuthenticatedUser,
  validate(customerValidation.searchByEmail),
  customer.searchByEmail
); // get v1/customers/search/email search customer by email
Router.route("/phone").get(
  auth.authorize("admin"),
  auth.isAuthenticatedUser,
  validate(customerValidation.searchByPhone),
  customer.searchByPhone
); //get v1/customers/search/phone search customer by phoneNumber
module.exports = Router;
