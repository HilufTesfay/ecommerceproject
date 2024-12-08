const { tokenService } = require("../services");
const { roleRights } = require("../config/roles");
//define function that ensures if customer or admin is authenticated
const isAuthenticatedUser = async (req, res, next) => {
  const { isValidToken } = await tokenService.isAuthenticatedToken(req);
  if (!isValidToken) {
    console.log("user is not authenticated, redirecting to login.");
    return res.redirect("/v1/auth/login");
  }
  return next();
};

//define function to autherize customer based on role
const authorize = (...requiredRights) => {
  return async (req, res, next) => {
    const { userRole, isValidToken } = await tokenService.isAuthenticatedToken(
      req
    );
    if (!isValidToken) {
      return res.status(403).send("Inavalid token");
    }
    const userRights = roleRights.get(userRole);
    const hasRight = requiredRights.every((right) => {
      return userRights.includes(right);
    });
    if (!hasRight) {
      return res.status(403).send("you are not authorized to access this api");
    }
    return next();
  };
};
module.exports = {
  isAuthenticatedUser,
  authorize,
};
