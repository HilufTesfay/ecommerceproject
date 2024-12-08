//define async functions erorr handler
const handleAsyncError = (asyncFunc) => {
  return (req, res, next) => {
    asyncFunc.call(this, req, res).catch((err) => next(err));
  };
};
module.exports = handleAsyncError;
