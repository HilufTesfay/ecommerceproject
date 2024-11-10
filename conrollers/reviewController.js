const { reviewService } = require("../services");
const errHandler = require("../middleware/errorHandler");
const { sendSuccessfullRespons, sendFailedRespons } = require("./utils");
//define function to check eligibilty of the customer,if the product is found in the database
const checkReview = (
  isProductFound,
  hasCustomerAcount,
  isReviewEmpty,
  customerReview
) => {
  if (hasCustomerAcount) {
    if (isProductFound) {
      if (!isReviewEmpty) {
        if (!!customerReview) {
          sendSuccessfullRespons(
            res,
            201,
            "submitted successfully",
            customerReview
          );
        } else {
          sendFailedRespons(
            res,
            400,
            "unable to submit your review,please try again"
          );
        }
      } else {
        sendFailedRespons(res, 400, "no review to submit");
      }
    } else {
      sendFailedRespons(
        res,
        400,
        `no product with id > ${req.body.productId} found`
      );
    }
  } else {
    sendFailedRespons(res, 400, "You have to create Acount");
  }
};
//define function to add customer review
const addCustomerReviews = errHandler.handleAsyncError(async (req, res) => {
  const { isProductFound, hasCustomerAcount, isReviewEmpty, customerReview } =
    await reviewService.addCustomerReviews(req);
  checkReview(isProductFound, hasCustomerAcount, isReviewEmpty, customerReview);
});
const getReviews = errHandler.handleAsyncError(async (req, res) => {
  const { reviews, numOfReviews } = await reviewService.getReviews();
  if (!!reviews) {
    sendSuccessfullRespons(res, 200, `${numOfReviews}`, reviews);
  } else {
    sendFailedRespons(res, 404, "no reviews found");
  }
});
module.exports = {
  addCustomerReviews,
  getReviews,
};
