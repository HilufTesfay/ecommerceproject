const validatePassword = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message(" password must be minimum 8 character");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      "passwod must contain atleast one letter and one number"
    );
  }
  return value;
};
const validateObjectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid Id');
  }
  return value;
};
const validatePhone = (value, helpers) => {
  let regex = /^(0|\+251)?(7|9){1}\d{8}$/;
  if (!regex.test(value)) {
    return helpers.message("your phone number is not valid");
  }
  return value;
};
module.exports = { validatePassword, validateObjectId, validatePhone };
