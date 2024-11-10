const express = require("express");
const { reviewController } = require("../../conrollers");
const Router = express.Router();
Router.route("/")
  .post(reviewController.addCustomerReviews) // post v1/products/reviews api to publish review
  .get(reviewController.getReviews); //get v1/products/reviews api to get all reviews
module.exports = Router;
