const { AppError } = require("../helpers/utilhelper");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const isAuthMiddleware = {};

isAuthMiddleware.loginRequired = (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;
    console.log("token String here", tokenString);
    if (!tokenString) {
      return next(new AppError(404, "Login required", "Authorization Error"));
    }
    const token = tokenString.replace("Bearer ", "");
    // if (token === null) {
    //   return next(new AppError(404, "Login required", "Authorization Error"));
    // }
    console.log("the token here:", token);

    console.log({ token, JWT_SECRET_KEY });

    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      console.log("payload nhu the nay:", payload);
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
      console.log("userID o day>>>>>", req.userId);
    });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuthMiddleware;
