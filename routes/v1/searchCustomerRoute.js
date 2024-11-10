const express = require("express");
const Router = express.Router();
const { customer } = require("../../conrollers");
Router.route("/email").get(customer.searchByEmail); // get v1/customers/search/email search customer by email
Router.route("/phone").get(customer.searchByPhone); //get v1/customers/search/phone search customer by phoneNumber
module.exports = Router;
