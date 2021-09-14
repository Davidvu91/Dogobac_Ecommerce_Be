const mongoose = require("mongoose");
const Product = require("../models/Product");
const Review = require("../models/review");
const Users = require("../models/User");

const getSingleProductById = async function (req, res, next) {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  let order = req.query.order ? req.query.order : "desc";

  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(403).json({ error: "Product not found" });
  }
  try {
    let product = await Product.findById(productId)
      .populate({
        path: "review",
        populate: { path: "owner.users", model: "Users" },
      })
      .lean();
    if (!product) {
      return res.status(403).json({ error: "Product not found" });
    }
    const category = product.category;
    let relatedProduct = await Product.find({
      _id: { $ne: req.product },
      category,
    })
      .limit(limit)
      .sort([[sortBy, order]])
      .populate("review");

    if (!relatedProduct) {
      return res.status(403).json({ error: "Related Product not found" });
    }
    product.relatedProduct = relatedProduct;
    req.product = product;
    next();
  } catch (error) {
    console.log(error);
    res.send("server error");
  }
};

module.exports = getSingleProductById;
