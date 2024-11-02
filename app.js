const express = require("express");
const app = express();
app.use(express.json());
const CusrtemorRouter = require("./routes/api/registerRoute");
const productRouter = require("./routes/api/productRoute");
const errHandler = require("./middleware/errorHandler");
app.use("/api/customer", CusrtemorRouter);
app.use("/api/product", productRouter);
app;
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
