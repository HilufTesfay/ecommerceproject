const auth = require("./userAuthentication");
const errHandler = require("./errorHandler");
const { validate } = require("./validation");
const { authLimit } = require("./rateLimiter");
module.exports = {
  auth,
  errHandler,
  validate,
  authLimit,
};
