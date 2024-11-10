const { Customer } = require("../models");
const mongoose = require("mongoose");
//define function to check if id is valid
const isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
  isValidId,
};
