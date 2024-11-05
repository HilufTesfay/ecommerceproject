const express = require("express");
const app = express();
app.use(express.json());
const routes = require("./routes/v1");
const errHandler = require("./middleware/errorHandler");
app.use("/v1/", routes);
app.get("/home", (req, res) => {
  res.status(200).send("home");
});
app.all("*", (req, res, next) => {
  const err = new errHandler.CustomError(
    `${req.originalUrl} is not found`,
    404
  );
  next(err);
});
app.use(errHandler.handleGlobalError);
module.exports = app;
