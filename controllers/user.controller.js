const utilHelpers = require("../helpers/utilhelper");
const { catchAsync, AppError, sendResponse } = require("../helpers/utilhelper");
const bcrypt = require("bcrypt");
const User = require("../models/User");
// const { findById } = require("../models/User");

const userController = {};

// CREATE USER CONTROLLER
userController.createAccountWithEmail = catchAsync(async (req, res, next) => {
  let { email, name, password } = req.body;
  // Check if data is enough infomation?
  if (!name || !email || !password) {
    return next(new AppError(400, "not enough data", "Register Fail!"));
  }
  // Check if email is not existed in our data?
  let user = await User.findOne({ email });
  if (user) {
    return next(
      new AppError(400, "Email already registered", "Register Fail!")
    );
  }
  // encrypt the password:
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  // Create new user and generate accessToken:
  user = await User.create({ email, name, password });
  const accessToken = await user.generateToken();

  // add new user to the Data base:
  return utilHelpers.sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Create user successfully"
  );
});

// UPDATE USER INFO
userController.updateUserInfo = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  console.log("userId sent from IsLogin middleware:", userId);
  const { name, email, avataUrl, address, phone } = req.body;
  let user = await User.findById(userId);
  if (!user)
    return next(new AppError(300, "User not found", "User update Error"));
  if (!name && !email && !avataUrl && !address && !phone)
    return next(new AppError(300, "No new change", "User update Error"));

  user = await User.findByIdAndUpdate(
    userId,
    { name, email, avataUrl, address, phone },
    { new: true }
  );
  return utilHelpers.sendResponse(
    res,
    200,
    true,
    { user },
    null,
    "Your Infor was updated successfully"
  );
});

// DELETE USER CONTROLLER
userController.deleteUserInfo = catchAsync(async (req, res, next) => {
  // console.log("Req Object:", req);
  let userId = req.userId;
  console.log("Id cua User sap bi xoa, ahihi:", userId);
  let user = await User.findById(userId);

  if (user.length === 0) {
    return next(new AppError(300, "User not found", "Delete User fail"));
  }
  user = await User.findByIdAndDelete(userId);
  // find all reviews that have owner = userId
  // --> delete reviewId in Product doccument
  return sendResponse(
    res,
    200,
    true,
    null,
    null,
    `Successfully delete ${user.name} account`
  );
});

// GET SINGLE USER CONTROLLER
userController.getSingleUserInfo = catchAsync(async (req, res) => {
  console.log("req object to get single user", req.user);
  const user = req.user;
  return sendResponse(
    res,
    200,
    true,
    { user },
    null,
    "get Single User successfully"
  );
});

// GET ALL USERS CONTROLLER
userController.getAllUserInfo = catchAsync(async (req, res, next) => {
  let data = await User.find();
  if (data.length === 0)
    return next(new AppError(500, "Server Error", "Can not get data"));
  let totalUser = await User.count();
  console.log("tong so user hien tai la:", totalUser);
  return sendResponse(
    res,
    200,
    true,
    { data, totalUser },
    null,
    "You get all User information"
  );
});

module.exports = userController;
