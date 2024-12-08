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
module.exports = { logIn, logout, refreshToken };
