const customerValidation = require("./customerValidation");
const productValidation = require("./productValidation");
const reviewValidation = require("./reviewValidation");
const { envSchema } = require("./envValidation");
const authValidation = require("./authValidation");
module.exports = {
  customerValidation,
  productValidation,
  reviewValidation,
  envSchema,
  authValidation,
};
