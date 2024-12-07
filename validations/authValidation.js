const joi = require("joi");
const logInUser = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};
module.exports = { logInUser };
