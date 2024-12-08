//define async functions erorr handler
const handleAsyncError = (asyncFunc) => {
  return (req, res, next) => {
    Promise.resolve(asyncFunc(req, res, next)).catch((err) => next(err));
  };
};

module.exports = handleAsyncError;
