const { validatePassword } = require("./customValidation");
const joi = require("joi");
const logIn = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};
const register = {
  body: joi.object().keys({
    email: joi.string().required().email(),
    password: joi.string().required().custom(validatePassword),
    firstName: joi.string().required(),
    role: joi.string().valid("admin"),
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
module.exports = { logIn, register, logout, refreshToken };
