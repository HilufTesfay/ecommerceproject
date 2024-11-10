const { Customer } = require("../models");
const { find } = require("../models/productModel");
const { isValidId } = require("./utils");
//define function to create customer acount
const createCustomer = async (req) => {
  const result = {
    isEmailUsed: await Customer.isEmailUsed(req.body.email),
    isPhoneUsed: await Customer.isphoneNumberUsed(req.body.phoneNumber),
    newCustomer: null,
  };
  if (!result.isEmailUsed && !result.isPhoneUsed) {
    result.newCustomer = await Customer.create(req.body);
  }
  return result;
};
//define function to update customer by Id
const updateCustomerById = async (req) => {
  const { id } = req.params;
  const results = {
    isValidId: isValidId(id),
    updatedCustomer: null,
  };
  const updateData = req.body;
  if (!!results.isValidId) {
    results.updatedCustomer = await Customer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidations: true,
    });
  }
  return results;
};
//define function to delete function by id
const deleteCustomerById = async (req) => {
  const { id } = req.params;
  const results = {
    isValidId: isValidId(id),
    deletedCustomer: null,
  };
  if (!!results.isValidId) {
    results.deletedCustomer = await Customer.findByIdAndDelete(id);
  }
  return results;
};
//define function to get customer by id
const getCustomerById = async (req) => {
  const { id } = req.params;
  const results = {
    isValidId: isValidId(id),
    customer: null,
  };
  if (!!results.isValidId) {
    results.customer = await Customer.findById(id);
  }
  return results;
};
//define function to get all customers
const getCustomers = async () => {
  const results = {
    customers: null,
    numOfCustomers: 0,
  };
  results.customers = await Customer.find({});
  results.numOfCustomers = await Customer.countDocuments({});
  return results;
};
// define function to search customers by email
const searchCustomerByEmail = async (email) => {
  let customer = null;
  customer = await Customer.findOne({ email: email });
  console.log("called");
  return customer;
};
//define function to search customer by Phone number
const searchCustomerByPhoneNumber = async (phoneNumber) => {
  let customer = null;
  customer = await Customer.findOne({
    phoneNumber: phoneNumber,
  });
  return customer;
};

module.exports = {
  createCustomer,
  updateCustomerById,
  getCustomers,
  getCustomerById,
  deleteCustomerById,
  searchCustomerByEmail,
  searchCustomerByPhoneNumber,
};
