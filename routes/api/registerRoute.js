const express = require("express");
const Router = express.Router();
const Customer = require("../../conrollers/customerRegisterController");
Router.route("/register").post(Customer.createCustomer);
module.exports = Router;
