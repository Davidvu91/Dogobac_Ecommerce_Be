const Product = require("../models/Product");
const Review = require("../models/review");
const User = require("../models/User");
const { catchAsync, AppError, sendResponse } = require("../helpers/utilhelper");

//Init Product Controller Collection:
const productController = {};

// CREATE PRODUCT CONTROOLER:
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

// UPDATE SINGLE PRODUCT CONTROLLER:
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

// DELETE A SINGLE PRODUCT CONTROLLER
productController.deleteProduct = async (req, res) => {
  let product = req.product;
  try {
    let deletedProduct = await product.remove();
    res.json({
      message: `${deletedProduct.name} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

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

// GET A LIST OF RELATED TO A PRODUCT CONTROLLER
productController.getRelatedProducts = async (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  let order = req.query.order ? req.query.order : "desc";
  let category = req.product.category;
  console.log(category);
  try {
    let products = await Product.find({
      _id: { $ne: req.product },
      category,
    })
      .limit(limit)
      .sort([[sortBy, order]])
      .populate("review");

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Invalid queries");
  }
};

// GET LIST OF PRODUCTS CONTROLLER
productController.getAllProducts = catchAsync(async (req, res, next) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let page = req.query.page ? parseInt(req.query.page) : 1;

  let offset = limit * (page - 1);
  // create query object to hold search value and category value
  let query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.name = {
      $regex: req.query.search,
      $options: "i",
    };
  }

  let products = await Product.find(query)
    .populate("review")
    .sort([[sortBy, order]])
    .limit(limit)
    .skip(offset);

  let totalProducts = await Product.find(query).count(query);
  console.log("Tổng số sản phẩm là:", totalProducts);

  let totalPage = Math.ceil(totalProducts / limit);

  return sendResponse(
    res,
    200,
    true,
    { totalPage, products, totalProducts },
    null,
    "Get products successfully"
  );
});

// GET LIST OF PRODUCTS BY SEARCH QUERY (BY NAME AND CATEGORY) CONTROLLER
productController.getListProductsBySearch = async (req, res) => {
  // create query object to hold search value and category value
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.name = {
      $regex: req.query.search,
      $options: "i",
    };
    // assign category value to query.category:
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
  }
  console.log("query Object to search:", query);
  try {
    let products = await Product.find(query).populate("review");
    let totalProducts = await Product.count(query);
    console.log("tong san pham search duoc:", totalProducts);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error to get products");
  }
};

// GET PRODUCTS FILTERD BY CATEGORY (option: order, sortBy, limit)
productController.getListProductsByCategoryAndPrice = async (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let page = req.query.page ? parseInt(req.query.page) : 1;
  let selectedCategory = req.query.category ? req.query.category : "";

  try {
    const totalProductByCategory = await Product.count({
      category: selectedCategory,
    });
    console.log(totalProductByCategory);
    let totalPages = Math.ceil(totalProductByCategory / limit);
    let offset = limit * (page - 1);
    const products = await Product.find({
      category: selectedCategory,
    })
      .populate("review")
      .sort([[sortBy, order]])
      .skip(offset)
      .limit(limit);
    return sendResponse(
      res,
      200,
      true,
      { products, totalPages },
      null,
      "Get products by category successfylly"
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Invalid queries");
  }
};

module.exports = productController;
