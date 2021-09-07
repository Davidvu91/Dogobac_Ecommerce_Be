const express = require("express");
const productController = require("../controllers/product.controller");
const adminMiddleware = require("../middlewares/admin.middleware");
const isAuthMiddleware = require("../middlewares/isAuth.middleware");
const router = express.Router();

/**
 * @Path : localhost:5000/product/create
 * @Method : POST
 * @Access : admin required
 * @Description : Create Product
 */
router.post(
  "/create",
  isAuthMiddleware.loginRequired,
  adminMiddleware,
  productController.createProduct
);

/**
 * @Path : localhost:5000/product/update/:productId
 * @Method : PUT
 * @Access : admin required
 * @Description : Update a singhle Product
 */
router.put("/update/:productId", productController.updateProduct);

module.exports = router;
