const joi = require("joi");
const { validateObjectId } = require("./customValidation");
const addCustomerReview = {
  params: {
    productId: joi.string().required().custom(validateObjectId),
  },
  body: {
    comment: joi.string(),
    rating: joi.number(),
  },
  user: {
    id: joi.string().required().custom(validateObjectId),
  },
};
const deleteReview = {
  params: {
    id: joi.string().required().custom(validateObjectId),
  },
};
module.exports = { addCustomerReview, deleteReview };
