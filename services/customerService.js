const { Customer } = require("../models");
const { isValidId } = require("./utils");
//define function to create customer acount
const createCustomer = async (req) => {
  req.body.role = "user";
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
const updateMyAcountById = async (req) => {
  const id = req.user.id;
  const results = {
    isValidId: isValidId(id),
    updatedAcount: null,
    acount: null,
    message: null,
  };
  const updateData = req.body;
  if (!updateData && Object.keys(updateData).length === 0) {
    results.message = "no data provided for update";
    return results;
  }
  if (!results.isValidId) {
    results.message = "Invalid id";
    return results;
  }
  results.acount = await Customer.findById(id);
  if (!results.acount) {
    results.message = "acount not found";
    return results;
  }
  Object.keys(updateData).forEach((key) => {
    results.acount[key] = updateData[key];
  });
  results.updatedAcount = await results.acount.save();
  if (!results.updatedAcount) {
    results.message = "unable to update acount";
    return results;
  }
  results.message = "updated successfully";
  return results;
};

//define function to delete customer by id
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
//define function to delete acount by the customer him/her self
const deleteMyAcount = async (req) => {
  const result = {
    isDeleted: false,
    acount: null,
  };
  result.acount = await Customer.findByIdAndDelete(req.user.id);
  result.isDeleted = !!result.acount;
  return result;
};
//define function to get customer by id
const getCustomerById = async (id) => {
  const customer = await Customer.findById(id);
  return customer;
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

//define function to get customer by email
const getCustomerByEmail = async (email) => {
  let customer = null;
  customer = await Customer.findOne({ email: email });
  return customer;
};
module.exports = {
  createCustomer,
  updateMyAcountById,
  getCustomers,
  getCustomerById,
  deleteCustomerById,
  deleteMyAcount,
  searchCustomerByEmail,
  searchCustomerByPhoneNumber,
  getCustomerByEmail,
};
