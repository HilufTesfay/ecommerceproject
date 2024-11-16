const mongoose = require("mongoose");
const { toJSON, timeStamp } = require("./plugins/plugins");
//const { timeStamp } = require("./plugins");
const reviewSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rating: {
    type: Number,
    min: [0, "Rating must be at least 0"],
    max: [5, "Rating must be at most 5"],
  },
  comment: String,
  date: {
    type: Date,
    default: Date.now,
  },
});
reviewSchema.plugin(timeStamp, { schemaName: "review" });
reviewSchema.plugin(toJSON, { schemaName: "review" });
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
