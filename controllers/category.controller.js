const { AppError, catchAsync, sendResponse } = require("../helpers/utilhelper");
const Category = require("../models/Category");

const categoryController = {};

categoryController.create = catchAsync(async (req, res, next) => {
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

module.exports = categoryController;
