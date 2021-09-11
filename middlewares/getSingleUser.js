const mongoose = require("mongoose");
const { AppError } = require("../helpers/utilhelper");
const User = require("../models/User");

const getSingleUserById = async function (req, res, next) {
  console.log(req.userId);
  const userId = req.userId;
  // console.log("userId to get single user:", userId);
  try {
    let user = await User.findById(userId).populate("review");
    // console.log("Tim duoc ong user nhu nay:", user);
    if (!user)
      return new AppError(400, "User not found", "User's Info is not correct");
    req.user = user;
    console.log("data of user before send next", req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

module.exports = getSingleUserById;
