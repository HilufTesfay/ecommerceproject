const express = require("express");
const app = express();
app.use(express.json());
const CusrtemorRegisterRouter = require("./routes/api/registerRoute");
const errHandler = require("./middleware/errorHandelr");
app.use("/api/customer", CusrtemorRegisterRouter);
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
