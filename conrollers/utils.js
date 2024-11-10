//define function that sends failed response
module.exports.sendFailedRespons = (res, code, message) => {
  res.status(code).json({
    status: "failed",
    message: message,
  });
};
//define function that sends successfull respons
module.exports.sendSuccessfullRespons = (res, code, message, result) => {
  res.status(code).json({
    status: "successfull",
    message: message,
    result: result,
  });
};
