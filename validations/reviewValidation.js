const joi = require("joi");
const { validateObjectId } = require("./customValidation");
const addCustomerReview = {
  params: {
    productId: joi.string().custom(validateObjectId).required(),
  },
  body: {
    comment: joi.string(),
    rating: joi.number(),
  },
  user: {
    id: joi.string().custom(validateObjectId).required(),
  },
};
const deleteReview = {
  params: {
    id: joi.string().custom(validateObjectId).required(),
  },
};
module.exports = { addCustomerReview, deleteReview };
