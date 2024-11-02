const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const errHandler = require("./../middleware/errorHandelr");
//define timestamp plugin
function timeStamp(schema) {
  schema.add({
    createdAt: {
      type: Date,
    },
    updateAt: {
      type: Date,
    },
  });
}
//define function to update createAt And createdAt fields
function recordTimeStamp(customer) {
  let currentTime = Date();
  customer.updateAt = currentTime;
  if (!customer.createdAt) {
    customer.createdAt = currentTime;
  }
}
//define customer schema
const customerSchema = mongoose.Schema({
  /*custProfilePic: {
    type: Buffer,
  },*/
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
        message: (props) => `${props.value} is shoul 1-10 length`,
      },
    },
  },
  password: {
    type: String,
    validate: {
      validator: (value) => validator.isStrongPassword(value),
      message: "your password is not Strong",
    },
  },
});

//call timeStamp plugin function to add createAt and UpdateAt fiels
customerSchema.plugin(timeStamp);
// hash password before save
customerSchema.pre(
  "save",
  errHandler.handleMgAsyncError(async function (next) {
    const customer = this;
    recordTimeStamp(customer);
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);
    next();
  })
);
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
