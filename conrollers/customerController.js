const { customerService } = require("../services");
const { errHandler } = require("../middleware");
const { sendFailedRespons, sendSuccessfullRespons } = require("./utils");
//define  middleware function to create new customer acount
const createCustomer = errHandler.handleAsyncError(async (req, res) => {
  const { isPhoneUsed, isEmailUsed, newCustomer } =
    await customerService.createCustomer(req);
  if (!isEmailUsed && !isPhoneUsed && !!newCustomer) {
    sendSuccessfullRespons(
      res,
      201,
      "congratulation!,you have created your acount successfully:",
      newCustomer
    );
  } else {
    if (isEmailUsed) {
      sendFailedRespons(res, 400, "This Email is used, please use other email");
    }
    if (isPhoneUsed) {
      sendFailedRespons(res, 400, "This phone is used, please use other phone");
    }
    if (!ispwStrong) {
      sendFailedRespons(res, 400, "your password is not strong");
    }
  }
});
//define middleware function to delete customer
const deleteCustomer = errHandler.handleAsyncError(async (req, res) => {
  const { isValidId, deletedCustomer } =
    await customerService.deleteCustomerById(req);
  if (!!deletedCustomer) {
    sendSuccessfullRespons(res, 200, "deleted successfully", deletedCustomer);
  } else if (!isValidId) {
    sendFailedRespons(res, 400, "invalid id");
  } else {
    sendFailedRespons(res, 400, `no customer found with ${req.params.id}`);
  }
});
//define middleware function to updaete customer by id
const updateCustomer = errHandler.handleAsyncError(async (req, res) => {
  const { isValidId, updatedCustomer } =
    await customerService.updateCustomerById(req);
  if (!!updatedCustomer) {
    sendSuccessfullRespons(res, 201, "updated successfully", updatedCustomer);
  } else if (!isValidId) {
    sendFailedRespons(res, 400, "invalid id");
  } else {
    sendFailedRespons(res, 400, `no customer found with ${req.params.id}`);
  }
});
// define middleware function to get customer by id
const getCustomer = errHandler.handleAsyncError(async (req, res) => {
  const { isValidId, customer } = await customerService.getCustomerById(req);
  if (!!customer) {
    sendSuccessfullRespons(res, 201, "customer", customer);
  } else if (!isValidId) {
    sendFailedRespons(res, 400, "invalid id");
  } else {
    sendFailedRespons(res, 400, `no customer found with ${req.params.id}`);
  }
});
//define  middleware function to get all customers
const getCustomers = errHandler.handleAsyncError(async (req, res) => {
  const { customers, numOfCustomers } = await customerService.getCustomers();
  if (!!customers) {
    sendSuccessfullRespons(res, 200, `${numOfCustomers}`, customers);
  } else {
    sendFailedRespons(res, 400, "no customer");
  }
});
//define middleware function that searches customer by email
const searchByEmail = errHandler.handleAsyncError(async (req, res) => {
  const customer = await customerService.searchCustomerByEmail(req.query.email);
  if (!!customer) {
    sendSuccessfullRespons(res, 200, "customer: ", customer);
  } else {
    sendFailedRespons(res, 404, "no customer found");
  }
});
// define middleware function that searches customer by phone number
const searchByPhone = errHandler.handleAsyncError(async (req, res) => {
  const customer = await customerService.searchCustomerByPhoneNumber(
    req.query.phoneNumber
  );
  if (!!customer) {
    sendSuccessfullRespons(res, 200, "customer: ", customer);
  } else {
    sendFailedRespons(res, 404, "no customer found");
  }
});
module.exports = {
  createCustomer,
  deleteCustomer,
  updateCustomer,
  getCustomer,
  getCustomers,
  searchByEmail,
  searchByPhone,
};
