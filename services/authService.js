const { Token, Customer } = require("../models");
const tokenService = require("./tokenService");
const { tokenTypes } = require("../config/tokens");
const { getCustomerByEmail, getCustomerById } = require("./customerService");
// define function login
const logInWithEmailAndPassword = async (email, password) => {
  const result = {
    user: null,
    message: null,
  };
  result.user = await getCustomerByEmail(email);
  const isMatch = await user.verifyPassword(password);
  if (!result.user || !isMatch) {
    result.message = "In correct email or password";
    return result;
  }
  result.message = "login successfully";
  return result;
};
//define function logout
const logOut = async (refreshToken) => {
  let message = null;
  const tokenDoc = await tokenService.verifyToken(
    refreshToken,
    tokenTypes.REFRESH
  );
  if (!tokenDoc) {
    message = "token not found";
    return message;
  }
  await Token.deleteOne({ token: tokenDoc.token });
  if (req.user) {
    delete req.user;
  }
  message = "log out successfullly";
  return message;
};
//define function to refresh token
const refreshToken = async (refreshToken) => {
  const tokenDoc = await tokenService.verifyToken(
    refreshToken,
    tokenTypes.REFRESH
  );
  if (!tokenDoc) {
    throw new Error("token not exist");
  }
  const user = await getCustomerById(tokenDoc.user);
  if (!user) {
    throw new Error("user not exist");
  }
  await Token.deleteOne({ token: tokenDoc.token });
  return await tokenService.generateAuthToken(user.id, user.role);
};
const register = async (req) => {
  req.body.role = "admin";
  const result = {
    isEmailUsed: await Customer.isEmailUsed(req.body.email),
    isPhoneUsed: await Customer.isphoneNumberUsed(req.body.phoneNumber),
    newAdmin: null,
  };
  if (!result.isEmailUsed && !result.isPhoneUsed) {
    result.newAdmin = await Customer.create(req.body);
  }
  return result;
};

module.exports = {
  logInWithEmailAndPassword,
  logOut,
  refreshToken,
  register,
};
