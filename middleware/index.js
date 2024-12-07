const auth = require("./userAuthentication");
const errHandler = require("./errorHandler");
const { validate } = require("./validation");
module.exports = {
  auth,
  errHandler,
  validate,
};
