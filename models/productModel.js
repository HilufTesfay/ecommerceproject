const mongoose = require("mongoose");
const Review = require("./reviewModel");
const { timeStamp, toJSON } = require("./plugins/plugins");
//define product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price must be a positive number"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  brand: {
    type: String,
    required: [true, "Product brand is required"],
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    min: [0, "Stock must be a positive number"],
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must be at most 5"],
    },
    count: {
      type: Number,
      default: 0,
      min: [0, "Rating count must be at least 0"],
    },
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductImage",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

productSchema.plugin(timeStamp, { schemaName: "product" });
productSchema.plugin(toJSON);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
