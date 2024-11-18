const express = require("express");
const { product } = require("../../conrollers");
const { auth } = require("../../middleware");
const Router = express.Router();
Router.route("/")
  .get(product.getProducts) // get v1/products/ api to get products
  .post(
    auth.authorize("admin"),
    auth.isAuthenticatedUser,
    product.createProduct
  ); //post  v1/products/ api to create products
Router.route("/:id")
  .delete(
    auth.authorize("admin"),
    auth.isAuthenticatedUser,
    product.deleteProduct
  ) // delete v1/products/id api to delete product
  .put(
    auth.authorize("admin"),
    auth.isAuthenticatedUser,
    product.updateProduct
  ); // put v1/products/id api to update product
Router.route("/search").get(product.search); //search api by price,brand,category,name etc
module.exports = Router;
