const { default: mongoose } = require("mongoose");

const productImageSChema = mongoose.Schema({
  images: {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    type: Buffer,
  },
});
const ProductImage = mongoose.model("ProductImage", productImageSChema);
