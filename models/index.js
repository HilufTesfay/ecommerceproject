const Customer = require("./custemorModel");
const Costomer = require("./custemorModel");
const Product = require("./productModel");
const Review = require("./reviewModel");
const Admin = require("./adminModel");
const Token = require("./tokenModel");
const connectToDb = require("./dataBaseConnection");
module.exports = {
  Customer,
  Product,
  connectToDb,
  Review,
  Admin,
  Token,
};
