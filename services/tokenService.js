const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");
const { Token } = require("../models");
//define function to generate token
const generateToken = (userId, userRole, expires, tokenType) => {
  const payload = {
    sub: userId,
    type: tokenType,
    iat: moment().unix(),
    exp: expires.unix(),
    role: userRole,
  };
  return jwt.sign(payload, config.SECRET_KEY);
};
//define function to save token to database
const saveToken = async (token, userid, type, expires, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token: token,
    user: userid,
    type: type,
    expires: expires.toDate(),
    blacklisted: blacklisted,
  });
  return tokenDoc;
};
//define function to verify token
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.SECRET_KEY);
  const tokenDoc = await Token.findOne({
    token: token,
    user: payload.sub,
    type: type,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error("token not found");
  }
  return tokenDoc;
};
//define function to generate auth token
const generateAuthToken = async (userId, userRole) => {
  const accessExpires = moment().add(
    config.ACCESS_EXPIRATION_MINUTES,
    "minutes"
  );
  const accessToken = generateToken(
    userId,
    userRole,
    accessExpires,
    tokenTypes.ACCESS
  );
  const refreshExpires = moment().add(config.REFRESH_EXPIRATION_DAYS, "days");
  const refreshToken = generateToken(
    userId,
    userRole,
    refreshExpires,
    tokenTypes.REFRESH
  );
  const tokenDoc = await saveToken(
    refreshToken,
    userId,
    tokenTypes.REFRESH,
    refreshExpires,
    false
  );
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};
const isAuthenticatedToken = async (req) => {
  const result = {
    isValidToken: false,
    userRole: "user",
  };
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (!accessToken) {
    return result;
  }
  const payload = jwt.verify(accessToken, config.SECRET_KEY);
  if (!payload) {
    return result;
  }
  result.isValidToken = true;
  result.userRole = payload.role;
  result.userId = payload.sub;
  return result;
};
module.exports = {
  generateToken,
  generateAuthToken,
  saveToken,
  verifyToken,
  isAuthenticatedToken,
};
