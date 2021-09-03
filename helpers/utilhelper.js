const utilHelpers = {};

//handle sending response object
utilHelpers.sendResponse = (res, statusCode, success, data, error, message) => {
  const response = {};
  if (success) response.success = success;
  if (data) response.data = data;
  if (error) response.error = error;
  if (message) response.message = message;
  res.status(statusCode).json(response);
};

//handle async function trycatch
utilHelpers.catchAsync = (func) => (req, res, next) => {
  func(req, res, next).catch((err) => next(err));
};

//Create Error type constructor to throw error

class AppError extends Error {
  constructor(statusCode, message, errorType) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    //all instance by this class will be operational error
    this.isOperational = true;
    // create a stack trace for debugging (Error obj, void obj to avoid stack polution)    Error.captureStackTrace(this, this.constructor);
  }
}
// add this class to utilHelper
utilHelpers.AppError = AppError;

module.exports = utilHelpers;
