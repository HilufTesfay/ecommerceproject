const express = require("express");
const { review } = require("../../conrollers");
const { auth } = require("../../middleware");
const Router = express.Router();
Router.route("/")
  .post(
    auth.authorize("customer"),
    auth.isAuthenticatedUser,
    review.addCustomerReviews
  ) // post v1/products/reviews api to publish review
  .get(auth.isAuthenticatedUser, review.getReviews); //get v1/products/reviews api to get all reviews
Router.route("/:id").delete(
  auth.authorize("admin"),
  auth.isAuthenticatedUser,
  review.deleteReview
); // delete v1/products/reviews/:id api to delete unneccessary coments
module.exports = Router;
