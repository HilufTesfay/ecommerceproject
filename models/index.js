const Customer = require("./custemorModel");
const Product = require("./productModel");
const Review = require("./reviewModel");
const Token = require("./tokenModel");
const connectToDb = require("./dataBaseConnection");
module.exports = {
  Customer,
  Product,
  connectToDb,
  Review,
  Token,
};
