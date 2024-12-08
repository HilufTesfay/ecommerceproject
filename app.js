const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
//const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const routes = require("./routes/v1");
const { handleGlobalError, authLimit } = require("./middleware");
const config = require("./config/config");
const app = express();
//set security header
app.use(helmet());
//parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//sanitize input data
//app.use(xss());
app.use(mongoSanitize());
//gzip compression
app.use(compression());
//enable cores
app.use(cors());
app.options("*", cors());
if (config.ENV === "production") {
  // set ratelimiter middleware
  app.use("v1/auth", authLimit);
}
app.get("/home", (req, res) => {
  res.status(200).send("well come");
});
app.use("/v1/", routes);
app.all("*", (req, res, next) => {
  const err = new errHandler.CustomError(
    `${req.originalUrl} is not found`,
    404
  );
  next(err);
});
app.use(handleGlobalError);
module.exports = app;
