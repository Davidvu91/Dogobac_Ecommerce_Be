const Product = require("../models/Product");
const { catchAsync, AppError, sendResponse } = require("../helpers/utilhelper");

//Init Product Controller Collection:
const productController = {};

// Create Product controller:
productController.createProduct = catchAsync(async (req, res, next) => {
  let data = req.body;
  console.log("minh nhan duoc data nhu nay thoi:", data);

  let {
    name,
    dimension,
    material,
    description,
    price,
    category,
    imageUrl,
    status,
    quantity,
    shipping,
  } = data;

  // check if data is enough info? All required field must received.
  if (
    !name ||
    !dimension ||
    !material ||
    !description ||
    !price ||
    !category ||
    !imageUrl
  ) {
    return next(
      new AppError(400, "Khong du data roi bao ei", "create product fail")
    );
  }
  // Create new product:
  let product = await Product.create({
    name,
    dimension,
    material,
    description,
    price,
    category,
    imageUrl,
    status,
    quantity,
    shipping,
  });

  return sendResponse(
    res,
    200,
    true,
    { product },
    null,
    "Create product successfully"
  );
});

module.exports = productController;
