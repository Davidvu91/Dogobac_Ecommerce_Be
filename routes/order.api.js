const express = require("express");
const orderController = require("../controllers/order.Controller");
const adminMiddleware = require("../middlewares/admin.middleware");
const getSingleUserById = require("../middlewares/getSingleUser");

const isAuthMiddleware = require("../middlewares/isAuth.middleware");
const router = express.Router();

/**
 * @path : localhost:5000/order/create
 * @method: POST
 * @access: login required
 * @description: create an Order
 */
router.post(
  "/create",
  isAuthMiddleware.loginRequired,
  orderController.createOrder
);

/**
 * @path : localhost:5000/order/getall
 * @method: POST
 * @access: admin required
 * @description: get list of order
 */
router.get(
  "/getall",
  isAuthMiddleware.loginRequired,
  adminMiddleware,
  orderController.getAllOrder
);

module.exports = router;
