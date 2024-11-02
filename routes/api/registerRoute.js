const express = require("express");
const Router = express.Router();
const createCustomer = require("../../conrollers/customerRegisterController");
Router.route("/register").post(createCustomer);
module.exports = Router;
