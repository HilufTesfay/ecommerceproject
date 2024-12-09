const { reviewService } = require("../services");
const { errHandler } = require("../utils");
const { sendSuccessfullRespons, sendFailedRespons } = require("./utils");
//define function to check eligibilty of the customer,if the product is found in the database
const checkReview = (
  isProductFound,
  hasCustomerAccount,
  isReviewEmpty,
  customerReview,
  res
) => {
  if (!hasCustomerAccount) {
    return sendFailedRespons(res, 400, "You have to create an account");
  }
  if (!isProductFound) {
    return sendFailedRespons(
      res,
      400,
      `No product with id ${req.body.productId} found`
    );
  }
  if (isReviewEmpty) {
    return sendFailedRespons(res, 400, "No review to submit");
  }
  if (!customerReview) {
    return sendFailedRespons(
      res,
      400,
      "Unable to submit your review, please try again"
    );
  }

  return sendSuccessfullRespons(
    res,
    201,
    "Submitted successfully",
    customerReview
  );
};

//define function to add customer review
const addCustomerReviews = errHandler.handleAsyncError(async (req, res) => {
  const { isProductFound, hasCustomerAcount, isReviewEmpty, customerReview } =
    await reviewService.addCustomerReviews(req);
  checkReview(
    isProductFound,
    hasCustomerAcount,
    isReviewEmpty,
    customerReview,
    res
  );
});
const getReviews = errHandler.handleAsyncError(async (req, res) => {
  const { reviews, numOfReviews } = await reviewService.getReviews();
  if (!!reviews) {
    sendSuccessfullRespons(res, 200, `${numOfReviews}`, reviews);
  } else {
    sendFailedRespons(res, 404, "no reviews found");
  }
});
const deleteReview = errHandler.handleAsyncError(async (req, res, next) => {
  const { isValidId, isDeleted, deletedReview } =
    await reviewService.deleteReviewById(req);
  if (!!deletedReview && isDeleted) {
    sendSuccessfullRespons(
      res,
      200,
      "Review deleted successfully",
      deleteReview
    );
  } else {
    sendFailedRespons(res, 400, `no review found with id ${req.params.id}`);
  }
});
module.exports = {
  addCustomerReviews,
  getReviews,
  deleteReview,
};
