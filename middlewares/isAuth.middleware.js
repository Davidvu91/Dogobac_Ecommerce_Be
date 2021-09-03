const { AppError } = require("../helpers/utilhelper");

const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const isAuthMiddleware = {};

isAuthMiddleware.loginRequired = (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    let tokenString = req.headers.authorization;
    if (!tokenString)
      return next(new AppError(404, "Login required", "Authorization Error"));
    const token = tokenString.replace("Bearer ", "");
    console.log({ token, JWT_SECRET_KEY });
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return next(
            new AppError(401, "Token is expired", "Validation Error")
          );
        } else {
          return next(
            new AppError(401, "Token is invalid", "Validation Error")
          );
        }
      }

      req.userId = payload._id;
    });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuthMiddleware;
