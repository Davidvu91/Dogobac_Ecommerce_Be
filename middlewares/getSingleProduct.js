const mongoose = require("mongoose");
const Product = require("../models/Product");

const getSingleProductById = async function (req, res, next) {
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(403).json({ error: "Product not found" });
  }

  try {
    let product = await Product.findById(productId);
    if (!product) {
      return res.status(403).json({ error: "Product not found" });
    }

    req.product = product;
    next();
  } catch (error) {
    console.log(error);
    res.send("server error");
  }
};

module.exports = getSingleProductById;
