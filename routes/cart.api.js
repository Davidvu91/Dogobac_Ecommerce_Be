const express = require("express");
const cartController = require("../controllers/cart.Controller");
const getSingleProductById = require("../middlewares/getSingleProduct");
const isAuthMiddleware = require("../middlewares/isAuth.middleware");
const router = express.Router();

/**
 * @path : localhost:5000/cart/add/:productId
 * @method: POST
 * @access: login required
 * @description: Add a product into cart
 */
router.post(
  "/add/:productId",
  isAuthMiddleware.loginRequired,
  getSingleProductById,
  cartController.createCart
);

/**
 * @path : localhost:5000/cart/delete/:cartId
 * @method: DELETE
 * @access: login required
 * @description: Get list cart of an user
 */
router.delete(
  "/delete/:cartId",
  isAuthMiddleware.loginRequired,
  cartController.deleteCart
);

module.exports = router;
