const { tokenService } = require("../services");
//define function that ensures if customer or admin is authenticated
const isAuthenticatedUser = (req, res, next) => {
  const { isValidToken } = tokenService.isAuthenticatedToken(req);
  if (!req.user || !isValidToken) {
    console.log("user is not authenticated, redirecting to login.");
    return res.redirect("/v1/auth/login");
  }
  return next();
};

//define function to autherize customer based on role
const authorize = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next();
    }
    return res.status(403).send("you are not authorized to access this api");
  };
};
module.exports = {
  isAuthenticatedUser,
  authorize,
};
