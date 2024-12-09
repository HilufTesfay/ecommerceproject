const express = require("express");
const { review } = require("../../conrollers");
const { auth, validate } = require("../../middleware");
const { reviewValidation } = require("../../validations");
const Router = express.Router();
Router.route("/").get(auth.isAuthenticatedUser, review.getReviews); //get v1/products/reviews api to get all reviews)
Router.route("/:id")
  .post(
    auth.authorize("addReview"),
    auth.isAuthenticatedUser,
    validate(reviewValidation.addCustomerReview),
    review.addCustomerReviews
  ) // post v1/products/reviews api to publish review
  .delete(
    auth.authorize("manageReview"),
    auth.isAuthenticatedUser,
    validate(reviewValidation.deleteReview),
    review.deleteReview
  ); // delete v1/products/reviews/:id api to delete unneccessary coments
module.exports = Router;
