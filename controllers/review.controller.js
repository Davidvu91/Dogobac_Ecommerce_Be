const mongoose = require("mongoose");
const { catchAsync, AppError, sendResponse } = require("../helpers/utilhelper");
const Review = require("../models/review");
const Product = require("../models/Product");

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
  //Update th review to the prodcut doccument:
  let product = await Product.findByIdAndUpdate(
    targetProduct,
    { review: review._id },
    { new: true }
  );

  return sendResponse(
    res,
    200,
    true,
    { review, product },
    null,
    "create review successfully"
  );
});

module.exports = reviewController;
