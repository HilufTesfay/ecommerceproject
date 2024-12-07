const express = require("express");
const { product } = require("../../conrollers");
const { auth, validate } = require("../../middleware");
const { productValidation } = require("../../validations");
const Router = express.Router();
Router.route("/")
  .get(product.getProducts) // get v1/products/ api to get products
  .post(
    auth.authorize("manageProducts"),
    auth.isAuthenticatedUser,
    validate(productValidation.createProduct),
    product.createProduct
  ); //post  v1/products/ api to create products
Router.route("/:id")
  .delete(
    auth.authorize("manageProducts"),
    auth.isAuthenticatedUser,
    validate(productValidation.deleteProduct),
    product.deleteProduct
  ) // delete v1/products/id api to delete product
  .put(
    auth.authorize("manageProducts"),
    auth.isAuthenticatedUser,
    validate(productValidation.updateProduct),
    product.updateProduct
  ); // put v1/products/id api to update product
Router.route("/search").get(
  validate(productValidation.searchProduct),
  product.search
); //search api by price,brand,category,name etc
module.exports = Router;
