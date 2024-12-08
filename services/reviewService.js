const { Review, Customer, Product } = require("../models");
const { isValidId } = require("./utils");
//define function that calculates average ratings
const calculateAverageRatings = (prevAvgRating, prevCount, curreRating) => {
  let totallPrevRating = prevAvgRating * prevCount;
  let curreAvgRating = (totallPrevRating + curreRating) / (prevCount + 1);
  return curreAvgRating;
};
//define function to check customer acount
const checkCustomerAccount = async (customerId) => {
  const customer = await Customer.findById(customerId);
  return !!customer;
};
//define function to check if product is available
const checkProduct = async (productId) => {
  const product = await Product.findById(productId);
  return product;
};
//define function to create review
const createReview = async (customerId, productId, rating, comment) => {
  const review = {
    customer: customerId,
    product: productId,
    ...(rating && { rating: rating }),
    ...(comment && { comment: comment, date: new Date() }),
  };

  return await Review.create(review);
};
//deefine function to update product ratings
const updateProductRatings = async (product, review) => {
  const prevAvgRating = product.ratings.average;
  const prevCount = product.ratings.count;
  const currentRating = review.rating;

  product.ratings.average = calculateAverageRatings(
    parseFloat(prevAvgRating),
    parseInt(prevCount),
    parseInt(currentRating)
  );
  product.ratings.count += 1;
  product.reviews = review.id;

  await product.save();
};
//define function to add customer review
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

  if (!(customerId && productId && (rating || comment))) {
    return results;
  }

  const hasCustomerAccount = await checkCustomerAccount(customerId);
  if (!hasCustomerAccount) {
    return results;
  }
  results.hasCustomerAcount = true;

  const product = await checkProduct(productId);
  if (!product) {
    return results;
  }
  results.isProductFound = true;

  const review = await createReview(customerId, productId, rating, comment);
  if (!review) {
    return results;
  }
  results.isReviewEmpty = false;
  results.customerReview = review;

  if (review.rating) {
    await updateProductRatings(product, review);
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
