const { Customer, Product } = require("../models");
const { isValidId } = require("./utils");
// defenine function to create product
const createProduct = async (req) => {
  const { name, description, price, category, brand, stock, images } = req.body;
  const newProduct = await Product.create({
    name: name.trim(),
    description: description.trim(),
    price: price,
    category: category.trim(),
    brand: brand,
    stock: stock,
    images: images,
  });
};
//define function to update product by id
const updateProductById = async (req) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = {
    isValidId: isValidId(id),
    updatedProduct: null,
  };
  if (!!result.isValidId) {
    result.updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }
  return result;
};
//define function to delete product by id
const deleteProductById = async (req) => {
  const { id } = req.params;
  const result = {
    isValidId: isValidId(id),
    deletedProduct: null,
  };
  if (!!result.isValidId) {
    result.deletedProduct = await Product.findByIdAndDelete(id);
  }
  console.log("ser", result);
  return result;
};
//define search function
const searchProduct = async (req) => {
  const { name, category, minPrice, maxPrice, price, brand, ratings } =
    req.query;
  let query = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  if (category) {
    query.category = { $regex: category, $options: "i" };
  }
  if (price) {
    query.price = parseFloat(price);
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
  if (ratings) {
    query["ratings.average"] = { $gte: parseInt(ratings) };
  }
  if (query) {
    let products = await Product.find(query);
    return products;
  }
};
const getProducts = async () => {
  const results = {
    products: null,
    numOfProducts: 0,
  };
  results.products = await Product.find({})
    .populate({
      path: "reviews",
      select: "rating comment",
      populate: {
        path: "customer",
        select: "firstName",
        model: "Customer",
      },
    })
    .exec();
  if (!!results.products) {
    results.numOfProducts = await Product.countDocuments({});
  }
  return results;
};

module.exports = {
  createProduct,
  updateProductById,
  deleteProductById,
  searchProduct,
  getProducts,
};
