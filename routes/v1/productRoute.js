const express = require("express");
const { product } = require("../../conrollers");
const Router = express.Router();
Router.route("/")
  .get(product.getProducts) // get v1/products/ api to get products
  .post(product.createProduct); //post  v1/products/ api to create products
Router.route("/:id")
  .delete(product.deleteProduct) // delete v1/products/id api to delete product
  .put(product.updateProduct); // put v1/products/id api to update product
Router.route("/search").get(product.search); //search api by price,brand,category,name etc
module.exports = Router;
