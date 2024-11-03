const express = require("express");
const productController = require("../../conrollers/productController");
const Router = express.Router();
Router.route("/")
  .post(productController.createProduct)
  .get(productController.getProducts);
Router.route("/:id")
  .delete(productController.deleteProduct)
  .put(productController.updateProduct);
Router.route("/search").get(productController.search);

module.exports = Router;
