const express = require("express");
const Router = express.Router();
const { customer } = require("../../conrollers");
Router.route("/")
  .get(customer.getCustomers) //get v1/customers api to get all customers
  .post(customer.createCustomer); // post v1/customers api to create customer acount
Router.route("/:id")
  .delete(customer.deleteCustomer) // delete v1/customers api to delete customer by id
  .put(customer.updateCustomer) // put v1/customers api to update customer by id
  .get(customer.getCustomer); //get  v1/customers api to get customer by id
module.exports = Router;
