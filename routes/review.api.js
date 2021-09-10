const express = require("express");
const reviewController = require("../controllers/review.controller");
const getSingleProductById = require("../middlewares/getSingleProduct");
const isAuthMiddleware = require("../middlewares/isAuth.middleware");
const router = express.Router();

/**
 * @path : localhost:5000/review/create/:productId
 * @method: POST
 * @access: login required
 * @description: Create a review to a product
 */

router.post(
  "/create/:productId",
  isAuthMiddleware.loginRequired,
  getSingleProductById,
  reviewController.createReview
);

/**
 * @path : localhost:5000/review/:productId
 * @method: GET
 * @access: public
 * @description: Get all review of Single Product
 */

router.get(
  "/:productId",
  getSingleProductById,
  reviewController.getReviewsOfSingleProduct
);

module.exports = router;
