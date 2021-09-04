const utilHelpers = require("../helpers/utilhelper");
const { catchAsync, AppError } = require("../helpers/utilhelper");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { findById } = require("../models/User");

const userController = {};

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

userController.updateUserInfo = catchAsync(async (req, res, next) => {
  const { userId } = req.body;
  const { name } = req.body;
  let user = await User.findById(userId);
  if (!user)
    return next(new AppError(300, "User not found", "User update Error"));
  if (!name)
    return next(new AppError(300, "No new change", "User update Error"));
  user = await User.findByIdAndUpdate(userId, { name }, { new: true });

  return utilHelpers.sendResponse(
    res,
    200,
    true,
    { user },
    null,
    "Your Infor was updated successfully"
  );
});

module.exports = userController;
