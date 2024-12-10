const { authService, customerService } = require("../services");
const { errHandler } = require("../utils");
const { tokenService, emailService } = require("../services");
const { sendFailedRespons } = require("./utils");
const { tokenTypes } = require("../config/config");
//define register middleware
const registerAdmin = errHandler.handleAsyncError(async (req, res) => {
  const { isPhoneUsed, isEmailUsed, newAdmin } = await authService.register(
    req
  );
  if (!isEmailUsed && !isPhoneUsed && !!newAdmin) {
    const tokens = await tokenService.generateAuthToken(
      newAdmin.id,
      newAdmin.role
    );
    const message = "registered successfully";
    res.status(200).json({ message, tokens });
  } else {
    if (isEmailUsed) {
      sendFailedRespons(res, 400, "This Email is used, please use other email");
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
const forgetPassword = errHandler.handleAsyncError(async (req, res) => {
  const { email } = req.body;
  const user = await customerService.getCustomerByEmail(email);
  if (!user) {
    return res.status(404).send(`no user found with this email ${email}`);
  }
  const resetToken = await tokenService.generateRestToken(user.id, user.role);
  await emailService.sendEmail(email, resetToken);
  res.status(200).send("we sent you verification email,check you email");
});
const resetPassword = errHandler.handleAsyncError(async (req, res) => {
  const { resetToken } = req.query;
  const { newPassword } = req.body;
  const resetTokenDoc = await tokenService.verifyToken(
    resetToken,
    tokenTypes.RESET
  );
  if (!resetTokenDoc) {
    return res.status(404).send("reset token not found");
  }

  const user = await customerService.getCustomerById(resetTokenDoc.user);
  if (!user) {
    return res.status(404).send("This user is not available");
  }
  user.password = newPassword;
  await user.save();
});
module.exports = {
  logInUser,
  logOutUser,
  refreshAuth,
  registerAdmin,
  forgetPassword,
  resetPassword,
  sendLoginForm,
};
