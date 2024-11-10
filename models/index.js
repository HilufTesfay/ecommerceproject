const Customer = require("./custemorModel");
const Costomer = require("./custemorModel");
const Product = require("./productModel");
const Review = require("./reviewModel");
const connectToDb = require("./dataBaseConnection");
module.exports = {
  Customer,
  Product,
  connectToDb,
  Review,
};
