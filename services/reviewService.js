const { Review, Customer, Product } = require("../models");
const { isValidId } = require("./utils");
//define function that calculates average ratings
const calculateAverageRatings = (prevAvgRating, prevCount, curreRating) => {
  let totallPrevRating = prevAvgRating * prevCount;
  let curreAvgRating = (totallPrevRating + curreRating) / (prevCount + 1);
  return curreAvgRating;
};
//define function to add customer reviews
const addCustomerReviews = async (req) => {
  const { comment, rating } = req.body;
  const productId = req.params.id;
  const customerId = req.user.id;
  const results = {
    isProductFound: false,
    hasCustomerAcount: false,
    isReviewEmpty: true,
    customerReview: null,
  };
  const review = {};
  if (customerId && productId && (rating || comment)) {
    const customer = await Customer.findById(customerId);
    if (!!customer) {
      review.customer = customerId;
      results.hasCustomerAcount = true;
      const product = await Product.findById(productId);
      if (product) {
        results.isProductFound = true;
        review.product = productId;
        if (rating) {
          review.rating = rating;
        }
        if (comment) {
          review.comment = comment;
          review.comment.date = Date.now();
        }
        if (review.rating || review.comment) {
          results.isReviewEmpty = false;
          results.customerReview = await Review.create(review);
          if (!!review.rating && !!results.customerReview) {
            const prevAvgRating = product.ratings.average;
            const prevCount = product.ratings.count;
            const currentRating = review.rating;
            product.ratings.average = calculateAverageRatings(
              parseFloat(prevAvgRating),
              parseInt(prevCount),
              parseInt(currentRating)
            );
            product.ratings.count = product.ratings.count + 1;
            product.reviews = results.customerReview.id;
            const updatedProduct = await product.save();
          }
        }
      }
    }
  }
  return results;
};
// defeine function to get all reviews including
const getReviews = async () => {
  const results = {
    reviews: null,
    numOfReviews: 0,
  };
  results.reviews = await Review.find({})
    .populate([
      { path: "product", select: " name" },
      { path: "customer", select: "firstName" },
    ])
    .exec();
  if (!!results.reviews) {
    results.numOfReviews = await Review.countDocuments({});
  }
  return results;
};
const deleteReviewById = async (req) => {
  const { id } = req.params;
  const result = {
    isValidId: isValidId(id),
    isDeleted: false,
    deletedReview: null,
  };
  result.deletedReview = await Review.findByIdAndDelete(id);
  result.isDeleted = !!result.deletedReview;
  return result;
};
module.exports = { addCustomerReviews, getReviews, deleteReviewById };
