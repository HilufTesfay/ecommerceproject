const express = require("express");
const Router = express.Router();
const Customer = require("../../conrollers/customerRegisterController");
Router.route("/").post(Customer.createCustomer); //.put(Customer.update);
module.exports = Router;
