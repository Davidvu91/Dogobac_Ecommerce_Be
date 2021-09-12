const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Users = require("../models/User");
const { catchAsync, AppError, sendResponse } = require("../helpers/utilhelper");

const cartController = {};
// ADD PRODUCTS TO CART CONTROLLER
cartController.createCart = catchAsync(async (req, res, next) => {
  const owner = req.userId;
  const productId = req.product._id;
  const { quantity } = req.body;
  console.log("thong tin cart owner:", owner);
  console.log("thong tin cart productId:", productId);
  console.log("thong tin cart quantity:", quantity);

  // check if data has owner, productId, quantity?
  if (!owner || !productId || !quantity) {
    return next(
      new AppError(400, "not enough data to create a cart", "careate cart fail")
    );
  }
  // check if userId and product Id is Valid?
  if (!mongoose.Types.ObjectId.isValid(owner)) {
    return res.status(403).json({ error: "User not found, create cart fail" });
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(403)
      .json({ error: "Product not found, create cart fail" });
  }

  // Create a Cart:
  let cart = await Cart.create({
    owner,
    items: [{ productId, quantity }],
  });
  // Update the cart to User collection:
  let user = await Users.findById(owner);
  user = await Users.findByIdAndUpdate(
    owner,
    {
      cart: [...user.cart, cart._id],
    },
    { new: true }
  );
  return sendResponse(
    res,
    200,
    true,
    { cart, user },
    null,
    "create a cart succsessfully"
  );
});

module.exports = cartController;
