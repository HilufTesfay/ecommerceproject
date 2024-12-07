const { tokenTypes } = require("../config/tokens");
const { toJSON } = require("./plugins/plugins");
const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Customer",
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.ACCESS, tokenTypes.REFRESH],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
tokenSchema.plugin(toJSON);
const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
