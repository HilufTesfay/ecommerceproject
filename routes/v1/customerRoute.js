const express = require("express");
const Router = express.Router();
const { auth, validate } = require("../../middleware");
const { customer } = require("../../conrollers");
const { customerValidation } = require("../../validations");
Router.route("/")
  .post(validate(customerValidation.createUser), customer.createCustomer)
  .get(
    auth.authorize("getUsers"),
    auth.isAuthenticatedUser,
    customer.getCustomers
  ); //get v1/customers api to get all customers

Router.route("/ac/profile")
  .get(
    auth.isAuthenticatedUser,
    auth.authorize("managePofile"),
    customer.getMyProfile
  ) // get v1/customers/ac/profile api to get profile
  .delete(
    auth.isAuthenticatedUser,
    auth.authorize("manageProfile"),
    validate(customerValidation.deleteMyAcount),
    customer.deleteMyAcount
  ) //api to delete acount by the user
  .put(
    auth.isAuthenticatedUser,
    auth.authorize("manageProfile"),
    validate(customerValidation.updateMyAcount),
    customer.updateMyAcount
  ); // put v1/customers api to update acount by user
Router.route("/:id")
  .delete(
    auth.authorize("manageUsers"),
    auth.isAuthenticatedUser,
    validate(customerValidation.deleteCustomer),
    customer.deleteCustomer
  ) // delete v1/customers api to delete customer by admin
  .get(
    auth.authorize("getUsers"),
    auth.isAuthenticatedUser,
    validate(customerValidation.getCustomer),
    customer.getCustomer
  ); //get  v1/customers api to get customer by id
module.exports = Router;
