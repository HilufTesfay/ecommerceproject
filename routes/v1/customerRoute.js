const express = require("express");
const { auth } = require("../../middleware");
const Router = express.Router();
const { customer } = require("../../conrollers");
Router.route("/")
  .get(auth.authorize("admin"), auth.isAuthenticatedUser, customer.getCustomers) //get v1/customers api to get all customers
  .post(customer.createCustomer); // post v1/customers api to create customer acount

Router.route("/ac/profile")
  .get(
    auth.isAuthenticatedUser,
    auth.authorize("customer"),
    customer.getMyProfile
  ) // get v1/customers/ac/profile api to get profile
  .delete(
    auth.isAuthenticatedUser,
    auth.authorize("customer"),
    customer.deleteMyAcount
  ) //api to delete acount by the user
  .put(
    auth.isAuthenticatedUser,
    auth.authorize("customer"),
    customer.updateMyAcount
  ); // put v1/customers api to update acount by user
Router.route("/:id")
  .delete(
    auth.authorize("admin"),
    auth.isAuthenticatedUser,
    customer.deleteCustomer
  ) // delete v1/customers api to delete customer by admin
  .get(auth.authorize("admin"), auth.isAuthenticatedUser, customer.getCustomer); //get  v1/customers api to get customer by id
module.exports = Router;
