const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { timeStamp, toJSON } = require("./plugins/plugins");
//define customer schema
const customerSchema = new mongoose.Schema({
  customerProfilePic: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],
  firstName: {
    type: String,
    required: [true, "first Name is required"],
    maxlength: [30, "first name is too long"],
    validate: {
      validator: (value) => validator.isAlpha(value.replace(/\s+/g, "")),
      message: " first name is not valid name",
    },
  },
  lastName: {
    type: String,
    required: [true, "last Name is required"],
    maxlength: [30, "last name is too long"],
    validate: {
      validator: (value) => validator.isAlpha(value.replace(/\s+/g, "")),
      message: " last name is not valid name",
    },
  },
  phoneNumber: {
    type: String,
    required: [true, "phone number is required"],
    unique: [true, "Phone number is already in use."],
    validate: {
      validator: (value) => validator.isMobilePhone(value, "any"),
      message: "Invalid phone number.",
    },
    default: "",
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    validate: [
      {
        validator: (value) => {
          return typeof value === "number";
        },
        message: "Please enter a valid age.",
      },
      {
        validator: (value) => {
          return value >= 18 && value < 100;
        },
        message:
          "You are not eligible to create an account, you must be 18 or older.",
      },
    ],
  },
  email: {
    type: String,
    unique: [true, "Email is already in use."],
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} is not valid email`,
    },
  },
  addres: {
    type: Object,
    region: {
      type: [String, "please enter valid address"],
      validate: {
        validator: (value) => validator.isLength(value, [1, 10]),
        message: (props) => `${props.value} is shoul 1-10 length`,
      },
    },
    city: {
      type: [String, "please enter valid valid city name"],
      validate: {
        validator: (value) => validator.isLength(value, [1, 10]),
        message: (props) => `${props.value} is should 1-10 length`,
      },
    },
  },
  password: {
    type: String,
    validate: {
      validator: (value) => validator.isStrongPassword(value),
      message: "your password is not Strong",
    },
    private: true,
  },
});
//define instance function to verify password
customerSchema.methods.verifyPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error);
  }
};
//define static method to check if phone number is used or not
customerSchema.statics.isphoneNumberUsed = async function (phoneNumber) {
  const customer = await this.findOne({ phoneNumber: phoneNumber });
  const isUsed = !!customer;
  return isUsed;
};
////define static method to check if email is used or not
customerSchema.statics.isEmailUsed = async function (CustomerEmail) {
  const customer = await this.findOne({ email: CustomerEmail });
  const isUsed = !!customer;
  return isUsed;
};

//add timeStamp and toJSON  plugin functions to add createAt and UpdateAt fiels
customerSchema.plugin(timeStamp, { schemaName: "customer" });
customerSchema.plugin(toJSON, { schemaName: "customer" });
// hash password before save
customerSchema.pre("save", async function (next) {
  try {
    const customer = this;
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);
    return next();
  } catch (error) {
    next(error);
  }
});
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
