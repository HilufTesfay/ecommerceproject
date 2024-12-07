const joi = require("joi");
const { validateObjectId } = require("./customValidation");
const createProduct = {
  body: {
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    category: joi.string().required(),
    brand: joi.string().required(),
    stock: joi.number().required(),
  },
};
const updateProduct = {
  paramas: {
    id: joi.string().required().custom(validateObjectId),
  },
  body: {
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    category: joi.string().required(),
    brand: joi.string().required(),
    stock: joi.number().required(),
  },
};
const deleteProduct = {
  paramas: {
    id: joi.string().required().custom(validateObjectId),
  },
};
const searchProduct = {
  query: {
    name: joi.string(),
    category: joi.string(),
    minPrice: joi.number(),
    maxPrice: joi.number(),
    price: joi.number(),
    brand: joi.number(),
    ratings: joi.number(),
  },
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
};
