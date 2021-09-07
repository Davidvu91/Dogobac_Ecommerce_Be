const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    // get user infomation to check is admin ?
    const user = await User.findOne({
      _id: req.userId,
    });
    console.log("vai tro cua minh la", user.role);

    if (user.role === 0) {
      return res.status(403).json({ error: "User must be admin" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

module.exports = adminMiddleware;
