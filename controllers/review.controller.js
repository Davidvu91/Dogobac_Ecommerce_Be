const mongoose = require("mongoose");
const { catchAsync, AppError, sendResponse } = require("../helpers/utilhelper");
const Review = require("../models/review");
const Product = require("../models/Product");
const Users = require("../models/User");

const reviewController = {};

// CREATE A REVIEW CONTROLLER
reviewController.createReview = catchAsync(async (req, res, next) => {
  let data = req.body;
  console.log("minh nhan dc thong tin review nhu nay:", data);

  const { content, rating } = data;
  const owner = req.userId;
  const targetProduct = req.product._id;

  // check if data has owner, targetProduct, rating (requied fields)?
  if (!owner || !targetProduct || !rating) {
    return next(
      new AppError(400, "Not enough data to create review", "reate review fail")
    );
  }
  // check if userId and productId is Valid?
  if (!mongoose.Types.ObjectId.isValid(owner)) {
    return res.status(403).json({ error: "User not found" });
  }
  if (!mongoose.Types.ObjectId.isValid(targetProduct)) {
    return res.status(403).json({ error: "Target Product not found" });
  }

  // create a review:
  let review = await Review.create({
    owner,
    targetProduct,
    content,
    rating,
  });
  //Update the review to the Prodcut collection:
  let product = await Product.findById(targetProduct);
  product = await Product.findByIdAndUpdate(
    targetProduct,
    { review: [...product.review, review._id] },
    { new: true }
  );

  //Update the review to the User collection:
  let user = await Users.findById(owner);
  user = await Users.findByIdAndUpdate(
    owner,
    {
      review: [...user.review, review._id],
    },
    { new: true }
  );

  return sendResponse(
    res,
    200,
    true,
    { review, product, user },
    null,
    "create review successfully"
  );
});

// GET ALL REIVIEWS OF A SINGLE PRODUCT CONTROLLER
reviewController.getReviewsOfSingleProduct = catchAsync(
  async (req, res, next) => {
    let product = req.product;
    let reviews = product.review;
    return sendResponse(
      res,
      200,
      true,
      reviews,
      null,
      `you successfully get reviews of ${product.name}`
    );
  }
);

module.exports = reviewController;
