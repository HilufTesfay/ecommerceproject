const express = require("express");
const Router = express.Router();
const { auth, validate } = require("../../middleware");
const { customer } = require("../../conrollers");
const { customerValidation } = require("../../validations");
Router.route("/")
  .get(auth.authorize("admin"), auth.isAuthenticatedUser, customer.getCustomers) //get v1/customers api to get all customers
  .post(validate(customerValidation.createUser), customer.createCustomer); // post v1/customers api to create customer acount

Router.route("/ac/profile")
  .get(
    auth.isAuthenticatedUser,
    auth.authorize("customer"),
    customer.getMyProfile
  ) // get v1/customers/ac/profile api to get profile
  .delete(
    auth.isAuthenticatedUser,
    auth.authorize("customer"),
    validate(customerValidation.deleteMyAcount),
    customer.deleteMyAcount
  ) //api to delete acount by the user
  .put(
    auth.isAuthenticatedUser,
    auth.authorize("customer"),
    validate(customerValidation.updateMyAcount),
    customer.updateMyAcount
  ); // put v1/customers api to update acount by user
Router.route("/:id")
  .delete(
    auth.authorize("admin"),
    auth.isAuthenticatedUser,
    validate(customerValidation.deleteCustomer),
    customer.deleteCustomer
  ) // delete v1/customers api to delete customer by admin
  .get(
    auth.authorize("admin"),
    auth.isAuthenticatedUser,
    validate(customerValidation.getCustomer),
    customer.getCustomer
  ); //get  v1/customers api to get customer by id
module.exports = Router;
