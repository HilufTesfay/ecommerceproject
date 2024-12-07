const validator = require("validator");
const mongoose = require("mongoose");
const plugin = require("./plugins/plugins");
const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    validate: {
      validator: (value) => validator.isAlpha(value.replace(/\s+/g, "")),
      message: " First Name is not valid name",
    },
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
    validate: {
      validator: (value) => validator.isAlpha(value.replace(/\s+/g, "")),
      message: " Last Name is not valid name",
    },
  },
  email: {
    type: String,
    unique: [true, "Email is already in use."],
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} is not valid email`,
    },
  },
  phoneNumber: {
    type: String,
    required: [true, "phone number is required"],
    unique: [true, "Phone number is already in use."],
  },
  password: {
    type: String,
    private: true,
  },
});

//add plugins
adminSchema.plugin(plugin.addRole, { schemaName: "admin" });
adminSchema.plugin(plugin.toJSON, { schemaName: "admin" });
adminSchema.plugin(plugin.timeStamp, { schemaName: "admin" });
adminSchema.plugin(plugin.hashPassword);
adminSchema.plugin(plugin.verifyPassword);
adminSchema.plugin(plugin.isEmailUsed);
adminSchema.plugin(plugin.isphoneNumberUsed);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
