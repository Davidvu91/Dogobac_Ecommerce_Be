const mongoose = require("mongoose");
const { AppError } = require("../helpers/utilhelper");
const User = require("../models/User");

const getSingleUserById = async function (req, res, next) {
  console.log(req.userId);
  const userId = req.userId;
  try {
    let user = User.findById(userId);
    if (!user)
      return new AppError(400, "User not found", "User's Info is not correct");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

module.exports = getSingleUserById;
