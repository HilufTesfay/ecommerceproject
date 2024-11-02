const Product = require("./../models/productSchema");
const errHandler = require("../middleware/errorHandler");

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
    category: category,
    brand: brand,
    stock: stock,
    images: images,
  });
  await newProduct.save();
  res.status(201).json({
    status: "successfull",
    message: "product uploaded successfully",
    product: newProduct,
  });
});
module.exports = { createProduct };
