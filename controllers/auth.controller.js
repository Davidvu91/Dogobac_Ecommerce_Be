const User = require("../models/User");
const { catchAsync, AppError } = require("../helpers/utilhelper");
const utilHelpers = require("../helpers/utilhelper");
const bcrypt = require("bcrypt");

const authController = {};

authController.loginWithEmail = catchAsync(async (req, res, next) => {
  console.log(req);

  // Distructrering data receive from frontend:
  let { email, password } = req.body;

  //check if enough data:
  if (!email || !password)
    return next(new AppError(400, "Not enough data", "Login fail"));

  // Check user:
  let user = await User.findOne({ email });
  if (!user) return next(new AppError(400, "User not found", "Login fail"));
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError(400, "Password Wrong", "Login Fail"));

  // Generate accessToken:
  const accessToken = await user.generateToken();
  return utilHelpers.sendResponse(
    res,
    200,
    true,
    { accessToken },
    null,
    "Authentication with email, Login succsessfully"
  );
});

module.exports = authController;
