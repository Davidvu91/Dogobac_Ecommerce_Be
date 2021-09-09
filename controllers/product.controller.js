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
    imageUrl.length === 0
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

// Update Single Product controller:
productController.updateProduct = catchAsync(async (req, res, next) => {
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
  } = req.body;
  let { productId } = req.params;

  let product = await Product.findById(productId);
  if (!product) {
    return next(new AppError(300, "Product not found", "Update product fail"));
  }
  if (
    !name &&
    !dimension &&
    !material &&
    !description &&
    !price &&
    !category &&
    !imageUrl &&
    !status &&
    !quantity &&
    !shipping
  ) {
    return next(new AppError(300, "No new change", "Product upadate error"));
  }
  product = await Product.findByIdAndUpdate(
    productId,
    {
      name,
      dimension,
      material,
      description,
      price,
      category,
      imageUrl,
      status,
      shipping,
    },
    { new: true }
  );
  return sendResponse(
    res,
    200,
    true,
    { product },
    null,
    "Your product successfully updated"
  );
});

// GET SINGLE PRODUCT BY ID CONTROLLER
productController.getSingleProduct = async (req, res) => {
  let product = req.product;
  return sendResponse(
    res,
    200,
    true,
    product,
    null,
    " get single product successfully"
  );
};

// GET ALL PRODUCTS CONTROLLER
productController.getAllProducts = async (req, res) => {
  console.log(req);
};

module.exports = productController;
