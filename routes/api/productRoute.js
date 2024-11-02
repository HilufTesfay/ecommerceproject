const express = require("express");
const productController = require("../../conrollers/productController");
const Router = express.Router();
Router.route("/create").post(productController.createProduct);

module.exports = Router;
