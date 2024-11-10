//define custom error class
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "Error" : "Failed";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
//define async functions erorr handler
const handleAsyncError = (asyncFunc) => {
  return (req, res, next) => {
    asyncFunc.call(this, req, res).catch((err) => next(err));
  };
};
// a special async error handler for functions has this keyword
const handleMgAsyncError = (asyncFunc) => {
  return function (next) {
    asyncFunc.call(this, next).catch((err) => next(err));
  };
};
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
  if (err.isOperational === true) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "something went wrong! please try again",
    });
  }
}
//define cast error handler function
function handleCastError(err) {
  const key = Object.keyValue(err.errors);
  const msg = `In valid input ${err.value} for ${key.path}`;
  return new CustomError(msg, 400);
}
// define mongoose validation error handler function
const handleValidationError = (err) => {
  const errMesssage = Object.values(err.errors).map((val) => val.message);
  let joinedmsg = errMesssage.join(", ");
  let msg = `invalid input,${joinedmsg}`;
  return new CustomError(msg, 400);
};
//define duplicate key handler function
function handleDuplicateError(err) {
  const key = Object.keys(err.keyValue);
  const value = Object.values(err.keyValue);
  const msg = `${value} is already in use,please enter other ${key} `;
  return new CustomError(msg, 400);
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
  CustomError,
  handleAsyncError,
  handleMgAsyncError,
};
