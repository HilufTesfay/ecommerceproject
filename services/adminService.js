const { Admin } = require("../models");
const { isValidId } = require("./utils");
const createAdmin = async (req) => {
  if (req.body.role) {
    delete req.body.role;
  }
  const result = {
    isEmailUsed: await Admin.isEmailUsed(req.body.email),
    isPhoneUsed: await Admin.isphoneNumberUsed(req.body.phoneNumber),
    admin: null,
  };

  if (!result.isEmailUsed && !result.isPhoneUsed) {
    result.admin = await Admin.create(req.body);
  }
  return result;
};
//define function to update customer by Id
const updateAdminById = async (req) => {
  const id = req.user.id;
  const results = {
    isValidId: isValidId(id),
    admin: null,
    updatedAdmin: null,
    message: null,
  };
  const updateData = req.body;
  if (!updateData && Object.keys(updateData) === 0) {
    results.message = "no data provided for update";
    return results;
  }
  if (!results.isValidId) {
    results.message = "not valid id";
    return results;
  }
  results.admin = await Admin.findById(id);

  if (!results.admin) {
    results.message = "admin not found";
    return results;
  }
  Object.keys(updateData).forEach((key) => {
    results.admin[key] = updateData[key];
  });
  results.updatedAdmin = await results.admin.save();
  if (!results.updatedAdmin) {
    results.message = "unable to update admin";
    return results;
  }
  results.message = "updated successfully";
  return results;
};
module.exports = {
  createAdmin,
  updateAdminById,
};
