const { authService } = require("../services");
const { errHandler } = require("../middleware");
const { tokenService } = require("../services");
const { sendFailedRespons } = require("./utils");
//define register middleware
const registerAdmin = errHandler.handleAsyncError(async (req, res) => {
  const { isPhoneUsed, isEmailUsed, newAdmin } = await authService.register(
    req
  );
  if (!isEmailUsed && !isPhoneUsed && !!newAdmin) {
    const tokens = tokenService.generateAuthToken(newAdmin.id, newAdmin.role);
    const message = "login successfully";
    res.status(200).json(message, tokens);
  } else {
    if (isEmailUsed) {
      sendFailedRespons(rs, 400, "This Email is used, please use other email");
      return 0;
    }
    if (isPhoneUsed) {
      sendFailedRespons(res, 400, "This phone is used, please use other phone");
      return 0;
    }
  }
});
//define login middleware
const logInUser = errHandler.handleAsyncError(async (req, res) => {
  const { email, password } = req.body;
  const { user, message } = await authService.logInWithEmailAndPassword(
    email,
    password
  );
  req.user = user;
  console.log("con-user", req.user);
  const token = await tokenService.generateAuthToken(user.id, user.role);
  return res.status(200).json({
    message,
    token,
  });
});
//define refreshAuth  middleware to refreshtoken
const refreshAuth = errHandler.handleAsyncError(async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    sendFailedRespons(res, 401, "no refresh token found");
    return;
  }
  const tokens = await authService.refreshToken(refreshToken);
  res.status(200).json({ tokens });
});
//define logout middleware
const logOutUser = errHandler.handleAsyncError(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    sendFailedRespons(res, 401, "no refresh token found");
    return;
  }
  const message = await authService.logOut(refreshToken);
  res.status(200).json(message);
});
const sendLoginForm = (req, res, next) => {
  res.status(200).json({
    message: "login with your email and password",
    email: "email",
    password: "password",
  });
};
module.exports = {
  logInUser,
  logOutUser,
  refreshAuth,
  registerAdmin,
  sendLoginForm,
};
