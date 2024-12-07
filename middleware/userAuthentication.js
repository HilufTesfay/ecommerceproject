const { tokenService } = require("../services");
const { roleRights } = require("../config/roles");
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
const authorize = (...requiredRights) => {
  return (req, res, next) => {
    const { userRole, isValidToken } = tokenService.isAuthenticatedToken(req);
    const userRights = roleRights.get(userRole);
    const hasRight = requiredRights.every((right) =>
      userRights.includes(right)
    );
    if (!!hasRight && !!isValidToken) {
      return next();
    }
    return res.status(403).send("you are not authorized to access this api");
  };
};
module.exports = {
  isAuthenticatedUser,
  authorize,
};
