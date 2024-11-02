const Customer = require("../models/custemorProfile");
const errHandler = require("../middleware/errorHandelr");
//define  function to create new customer acount
createCustomer = errHandler.handleAsyncError(async function (req, res, next) {
  const newCustomer = new Customer(req.body);
  const saved = await newCustomer.save();
  res.status(200).json({
    status: "successfull",
    message: "congratulation!,you have created your acount successfully",
  });
  next();
});
updateCustomer = async function (req, res, next) {};

module.exports = createCustomer;
