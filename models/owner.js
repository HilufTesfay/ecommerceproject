const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["owner", "admin"],
    default: "admin",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
