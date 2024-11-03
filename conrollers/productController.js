const Product = require("./../models/productSchema");
const Customer = require("./../models/custemorProfile");
const errHandler = require("../middleware/errorHandler");
const { default: mongoose } = require("mongoose");

//define function to check if id is valid
const isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
//define function that sends failed response
const sendFailedRespons = (res, code, message) => {
  res.status(code).json({
    status: "failed",
    message: message,
  });
};
//define function that sends successfull respons
const sendSuccessfullRespons = (res, code, message, result) => {
  res.status(code).json({
    status: "successfull",
    message: message,
    result: result,
  });
};
//define function that calculates average ratings
const calculateAverageRatings = (prevAvgRating, prevCount, curreRating) => {
  let totallPrevRating = prevAvgRating * prevCount;
  let curreAvgRating = (totallPrevRating + curreRating) / (prevCount + 1);
  return curreAvgRating;
};
// defenine function to create product
const createProduct = errHandler.handleAsyncError(async function (
  req,
  res,
  next
) {
  const { name, description, price, category, brand, stock, images } = req.body;
  const newProduct = new Product({
    name: name.trim(),
    description: description.trim(),
    price: price,
    category: category.trim(),
    brand: brand,
    stock: stock,
    images: images,
  });
  const result = await newProduct.save();
  sendSuccessfullRespons(res, 201, "product uploaded successfully", newProduct);
});

//define function that updates product
const updateProduct = errHandler.handleAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (isValidId(id)) {
    const updateData = req.body;
    const updated = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (updated) {
      sendSuccessfullRespons(res, 200, "product updated successfully", updated);
    } else {
      sendFailedRespons(res, 400, "product not found");
    }
  } else {
    sendFailedRespons(res, 400, "invalid Id");
  }
});
// define function that deletes product
const deleteProduct = errHandler.handleAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (isValidId(id)) {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
      console.log(deleteProduct);
      sendSuccessfullRespons(
        res,
        201,
        "product deleted successfully",
        deletedProduct
      );
    } else {
      sendFailedRespons(res, 404, `no product with id ${id} found`);
    }
  } else {
    sendFailedRespons(res, 400, "invalid Id");
  }
});
//define search function that searches based on customer requirement
const search = errHandler.handleAsyncError(async (req, res, next) => {
  const { name, category, minPrice, maxPrice, brand, ratings } = req.query;
  console.log(req.query);
  let query = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  if (category) {
    query.category = { $regex: category, $options: "i" };
  }
  if (minPrice && maxPrice) {
    query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
  } else if (maxPrice) {
    query.price = { $lte: parseFloat(maxPrice) };
  } else if (minPrice) {
    query.price = { $gte: parseFloat(minPrice) };
  }
  if (brand) {
    query.brand = { $regex: brand, $options: "i" };
  }
  if (query) {
    let products = await Product.find(query);
    if (!products) {
      sendFailedRespons(res, 404, "product not found");
    } else {
      sendSuccessfullRespons(res, 200, `${products.length}`, { products });
    }
  } else {
    sendFailedRespons(res, 400, "empty query");
  }
});

//define function that provide rating end point to customer
const addCustomerReviews = errHandler.handleAsyncError(
  async (req, res, next) => {
    const { customerId, productId, comment, ratings } = req.body;
    if (customerId && productId && (ratings || comment)) {
      const customer = await Customer.findById(customerId);
      if (customer) {
        let review = {};
        const product = await Product.findById(productId);
        if (product) {
          review.customer = customerId;
          if (ratings) {
            review.ratings = ratings;
          }
          if (comment) {
            review.comment = comment;
            review.comment.date = Date.now();
          }
          if (review.ratings || review.comment) {
            product.reviews.push(review);
            if (review.ratings) {
              const prevAvgRating = product.ratings.average;
              const prevCount = product.ratings.count;
              const currentRating = review.ratings;
              product.ratings.average = calculateAverageRatings(
                prevAvgRating,
                prevCount,
                currentRating
              );
              product.ratings.count = product.ratings.count + 1;
            }
            const rev = await product.save();
            sendSuccessfullRespons(res, 201, "your review is submitted", rev);
          } else {
            sendFailedRespons(res, 400, "fields are empty");
          }
        } else {
          sendFailedRespons(res, 400, "product is not found");
        }
      } else {
        sendFailedRespons(res, 400, "you have to create acount or login ");
      }
    } else {
    }
  }
);
const getProducts = errHandler.handleAsyncError(async (req, res, next) => {
  const products = await Product.find({});
  if (products) {
    const countDoc = await Product.countDocuments({});
    sendSuccessfullRespons(
      res,
      200,
      `list of products (${countDoc})`,
      products
    );
  } else {
    sendFailedRespons(res, 204, "no product found");
  }
});
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  search,
  addCustomerReviews,
  getProducts,
};
