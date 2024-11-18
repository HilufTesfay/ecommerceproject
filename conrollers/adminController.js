const { adminService } = require("../services");
const { sendSuccessfullRespons, sendFailedRespons } = require("./utils");
const { errHandler, auth } = require("../middleware");
const createAdmin = errHandler.handleAsyncError(async (req, res, next) => {
  const { isPhoneUsed, isEmailUsed, admin } = await adminService.createAdmin(
    req
  );
  if (!isEmailUsed && !isPhoneUsed && !!admin) {
    const isSessCreated = await auth.createSession(req, admin);

    sendSuccessfullRespons(
      res,
      201,
      "congratulation!,you have created your acount successfully:",
      admin
    );
  } else {
    if (isEmailUsed) {
      sendFailedRespons(res, 400, "This Email is used, please use other email");
      return 0;
    }
    if (isPhoneUsed) {
      sendFailedRespons(res, 400, "This phone is used, please use other phone");
      return 0;
    }
    /*if (!ispwStrong) {
      sendFailedRespons(res, 400, "your password is not strong");
    }*/
  }
});
const updateMyAcount = errHandler.handleAsyncError(async (req, res, next) => {
  const { isValidId, admin, updatedAdmin, message } =
    await adminService.updateAdminById(req);
  if (!!updatedAdmin) {
    sendSuccessfullRespons(res, 201, message, updatedAdmin);
  } else sendFailedRespons(res, 400, message);
});

module.exports = { createAdmin, updateMyAcount };
