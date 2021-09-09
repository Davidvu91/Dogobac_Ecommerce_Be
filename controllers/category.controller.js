const { AppError, catchAsync, sendResponse } = require("../helpers/utilhelper");
const Category = require("../models/Category");

// Init the collectio of Category Main Controllers:
const categoryController = {};

// Create Category Controller
categoryController.createCategory = catchAsync(async (req, res, next) => {
  let { name } = req.body;
  // check if there is a category's name:
  if (!name) {
    return next(new AppError(400, "not enough data", "Create category fail"));
  }
  // Check if the category is already existed:
  let category = await Category.findOne({ name });
  if (category) {
    return next(
      new AppError(400, "category is already existed", "Create category fail")
    );
  }
  return sendResponse(
    res,
    200,
    true,
    { category },
    null,
    "create category successfully"
  );
});

// Update Category Controller
categoryController.updateCategory = catchAsync(async (req, res, next) => {
  console.log(req.body);
  let category = req.category;
  let { name } = req.body;
  if (!name) {
    return next(
      new AppError(400, "No category is changed", "Update Category fail")
    );
  } else {
    category.name = name.trim().toLowerCase();
    category = await category.save();
  }
  return sendResponse(
    res,
    200,
    true,
    { category },
    null,
    "Update Category successfully"
  );
});

// Delete Category Controller
categoryController.deleteCategory = catchAsync(async (req, res, next) => {
  console.log(req.body);
  let { categoryId } = req.body;
  let category = await Category.findById({ categoryId });
  if (!categoryId) {
    return next(
      new AppError(400, "Category not found", "Delete Category fail")
    );
  }
  category = await Category.findByIdAndDelete(categoryId);
  return sendResponse(
    res,
    200,
    true,
    null,
    null,
    `Delete ${category.name} Category successfully`
  );
});

// Get all Category Controller
categoryController.takeCategory = catchAsync(async (req, res, next) => {
  let categories = await Category.find({});
  if (!categories)
    return new AppError(500, "Server Error", "Get Category fail");
  return sendResponse(
    res,
    200,
    true,
    { categories },
    null,
    "You rceived all categories"
  );
});

// Get Single Category Controller
categoryController.getSingleCategory = catchAsync(async (req, res, next) => {
  let singleCategory = req.category;
  return sendResponse(
    res,
    200,
    true,
    { singleCategory },
    null,
    "Successfully get single category"
  );
});

module.exports = categoryController;
