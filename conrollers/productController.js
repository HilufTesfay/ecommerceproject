const { errHandler } = require("../middleware");
const { productService } = require("../services");
const { default: mongoose } = require("mongoose");
const { sendSuccessfullRespons, sendFailedRespons } = require("./utils");
// defenine function to create product
const createProduct = errHandler.handleAsyncError(async (req, res) => {
  const newProduct = await productService.createProduct(req);
  sendSuccessfullRespons(res, 201, "product uploaded successfully", newProduct);
});

//define function that updates product
const updateProduct = errHandler.handleAsyncError(async (req, res) => {
  const { isValidId, updatedProduct } = await productService.updateProductById(
    req
  );
  if (!!updatedProduct) {
    sendSuccessfullRespons(
      res,
      200,
      "product updated successfully",
      updatedProduct
    );
  } else if (!isValidId) {
    sendFailedRespons(res, 400, "invalid product Id");
  } else {
    sendFailedRespons(res, 400, `no product with id > ${req.params.id} found`);
  }
});
// define function that deletes product
const deleteProduct = errHandler.handleAsyncError(async (req, res) => {
  const { isValidId, deletedProduct } = await productService.deleteProductById(
    req
  );
  if (!!deletedProduct) {
    sendSuccessfullRespons(
      res,
      201,
      "product deleted successfully",
      deletedProduct
    );
  } else if (!isValidId) {
    sendFailedRespons(res, 400, "invalid Id");
  } else {
    sendFailedRespons(res, 404, `no product with id >${req.params.id} found`);
  }
});
//define search function that searches based on customer requirement
const search = errHandler.handleAsyncError(async (req, res) => {
  const products = await productService.searchProduct(req);
  if (!products) {
    sendFailedRespons(res, 404, "product not found");
  } else {
    sendSuccessfullRespons(res, 200, `${products.length}`, { products });
  }
});
// define function to get all products
const getProducts = errHandler.handleAsyncError(async (req, res) => {
  const { products, numOfProducts } = await productService.getProducts();
  if (!!products) {
    sendSuccessfullRespons(
      res,
      200,
      `list of products (${numOfProducts})`,
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
  getProducts,
};
