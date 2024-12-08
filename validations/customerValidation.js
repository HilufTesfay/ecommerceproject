const joi = require("joi");
const {
  validatePassword,
  validateObjectId,
  validatePhone,
} = require("./customValidation");
const createUser = {
  body: joi.object().keys({
    firstName: joi.string().min(1).max(30).required(),
    lastName: joi.string().min(1).max(30).required(),
    phoneNumber: joi.string().custom(validatePhone).required(),
    age: joi.number().integer().min(18).max(100).required(),
    email: joi.string().email().required(),
    role: joi.string().valid("user", "admin"),
    address: joi.object().keys({
      region: joi.string().min(1).max(30),
      city: joi.string().min(1).max(30),
    }),
    password: joi.string().custom(validatePassword).required(),
  }),
};
const deleteCustomer = {
  params: joi.object().keys({
    id: joi.string().custom(validateObjectId),
  }),
};
const getCustomer = {
  params: joi.object().keys({
    id: joi.string().custom(validateObjectId),
  }),
};
const searchByEmail = {
  query: joi.object().keys({
    email: joi.string().email(),
  }),
};
const searchByPhone = {
  query: joi.object().keys({
    phoneNumber: joi.custom(validatePhone),
  }),
};
const updateMyAcount = {
  user: joi.object().keys({
    id: joi.string().custom(validateObjectId),
  }),
  body: joi.object().keys({
    firstName: joi.string().min(1).max(30),
    lastName: joi.string().min(1).max(30),
    phoneNumber: joi.string().custom(validatePhone),
    age: joi.number().integer().min(18).max(100),
    email: joi.string().email(),
    address: joi.object().keys({
      region: joi.string().min(1).max(30),
      city: joi.string().min(1).max(30),
    }),
    password: joi.string().custom(validatePassword),
  }),
};
const deleteMyAcount = {
  user: joi.object().keys({
    id: joi.string().custom(validateObjectId),
  }),
};
module.exports = {
  createUser,
  deleteCustomer,
  getCustomer,
  searchByEmail,
  searchByPhone,
  updateMyAcount,
  deleteMyAcount,
};
