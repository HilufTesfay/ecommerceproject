const express = require("express");
const productController = require("../../conrollers/productController");
const Router = express.Router();
Router.route("/")
  .post(productController.createProduct) // api/products/ api to create and get products
  .get(productController.getProducts);
Router.route("/:id") //api/products/id api to update and delete based on id
  .delete(productController.deleteProduct)
  .put(productController.updateProduct);
Router.route("/search").get(productController.search); //search api based on price,brand,category,name etc
Router.route("/reviews").post(productController.addCustomerReviews); //review API that enables customer t add review

module.exports = Router;
