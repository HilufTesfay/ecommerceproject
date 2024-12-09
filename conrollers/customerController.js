const { customerService } = require("../services");
const { tokenService } = require("../services");
const { errHandler } = require("../utils");
const { sendFailedRespons, sendSuccessfullRespons } = require("./utils");
//define  middleware function to create new customer acount
const createCustomer = errHandler.handleAsyncError(async (req, res) => {
  const { isPhoneUsed, isEmailUsed, newCustomer } =
    await customerService.createCustomer(req);
  if (!isEmailUsed && !isPhoneUsed && !!newCustomer) {
    const tokens = await tokenService.generateAuthToken(
      newCustomer.id,
      newCustomer.role
    );
    const message = "login successfully";
    res.status(200).json({ message, tokens });
  } else {
    if (isEmailUsed) {
      sendFailedRespons(res, 400, "This Email is used, please use other email");
      return 0;
    }
    if (isPhoneUsed) {
      sendFailedRespons(res, 400, "This phone is used, please use other phone");
      return 0;
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
//define middleware function to delete acount
const deleteMyAcount = errHandler.handleAsyncError(async (req, res, next) => {
  const { isDeleted, acount } = await customerService.deleteMyAcount(req);
  if (isDeleted && acount) {
    sendSuccessfullRespons(
      res,
      200,
      "you have deleted your acount successfully",
      acount.firstName
    );
  } else {
    sendFailedRespons(res, 401, "you have not deleted your acount!");
  }
});
//define middleware function to updaete customer by id
const updateMyAcount = errHandler.handleAsyncError(async (req, res) => {
  const { updatedAcount, message } = await customerService.updateMyAcountById(
    req
  );
  if (!!updatedAcount) {
    sendSuccessfullRespons(res, 201, "updated successfully", updatedAcount);
  } else {
    sendFailedRespons(res, 400, message);
  }
});
// define middleware function to get customer by id
const getCustomer = errHandler.handleAsyncError(async (req, res) => {
  const customer = await customerService.getCustomerById(req.params.id);
  if (!!customer) {
    sendSuccessfullRespons(res, 201, "customer", customer);
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

// define function to get customer profile
const getMyProfile = (req, res, next) => {
  res.status(200).json({
    message: "ur profile",
    user: req.user,
  });
};

module.exports = {
  createCustomer,
  deleteCustomer,
  updateMyAcount,
  getCustomer,
  getCustomers,
  searchByEmail,
  searchByPhone,
  deleteMyAcount,
  getMyProfile,
};
