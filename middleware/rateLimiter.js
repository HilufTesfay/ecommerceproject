const rateLimit = require("express-rate-limit");
const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  skipSuccessfulRequests: true,
  handler: (req, res) => {
    res.status(429).send("you reached maximum limit,please try later");
  },
});

module.exports = {
  authLimit,
};
