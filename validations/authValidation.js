const { validatePassword } = require("./customValidation");
const joi = require("joi");
const logIn = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};
const logout = {
  body: joi.object().keys({
    refreshToken: joi.string().required(),
  }),
};
const refreshToken = {
  body: joi.object().keys({
    refreshToken: joi.string().required(),
  }),
};
const forgetPassword = {
  body: joi.object().keys({
    email: joi.string().email().required(),
  }),
};
const resetPassword = {
  query: joi.object().keys({
    resetToken: joi.string().required(),
  }),
  body: joi.object().keys({
    newPassword: joi.string().custom(validatePassword).required(),
  }),
};
module.exports = { logIn, logout, refreshToken, forgetPassword, resetPassword };
