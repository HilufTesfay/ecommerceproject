const express = require("express");
const routes = require("./routes/v1");
const { errHandler, authLimit } = require("./middleware");
const config = require("./config/config");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/home", (req, res) => {
  res.status(200).send("well come");
});
if (config.ENV === "production") {
  app.use("v1/auth", authLimit);
}
app.use("/v1/", routes);
app.all("*", (req, res, next) => {
  const err = new errHandler.CustomError(
    `${req.originalUrl} is not found`,
    404
  );
  next(err);
});
app.use(errHandler.handleGlobalError);
module.exports = app;
