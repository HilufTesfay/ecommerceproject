const { errHandler } = require("../utils");
//define error handler at development stage
function handleDevError(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stackTrace: err.stack,
    error: err,
  });
}
//define error handeler at production stage
function handleProdError(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(err.name);
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "something went wrong! please try again",
    });
  }
}
//define cast error handler function
function handleCastError(err) {
  const key = Object.keys(err.errors);
  console.log(key);
  const msg = `In valid input for ${key.path}`;
  return new errHandler.CustomError(msg, 400);
}
// define mongoose validation error handler function
const handleValidationError = (err) => {
  const errMesssage = Object.values(err.errors).map((val) => val.message);
  let joinedmsg = errMesssage.join(", ");
  let msg = `invalid input,${joinedmsg}`;

  return new errHandler.CustomError(msg, 400);
};
//define duplicate key handler function
function handleDuplicateError(err) {
  const key = Object.keys(err.keyValue);
  const value = Object.values(err.keyValue);
  const msg = `${value} is already in use,please enter other ${key} `;
  return new errHandler.CustomError(msg, 400);
}
//define global error handler
const handleGlobalError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.stataus = error.stataus || "error";
  if (process.env.NODE_ENV === "development") {
    handleDevError(error, res);
  } else if (process.env.NODE_ENV === "production") {
    if (error.name === "CastError") {
      error = handleCastError(error);
    }
    if (error.name === "ValidationError") {
      error = handleValidationError(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateError(error);
    }
    handleProdError(error, res);
  }
};

module.exports = {
  handleGlobalError,
};
