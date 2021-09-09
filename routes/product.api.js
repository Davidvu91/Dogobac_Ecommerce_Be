const express = require("express");
const productController = require("../controllers/product.controller");
const adminMiddleware = require("../middlewares/admin.middleware");
const getSingleProductById = require("../middlewares/getSingleProduct");
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
 * @Path : localhost:5000/product/:productId
 * @Method : PUT
 * @Access : admin required
 * @Description : Update a singhle Product
 */
router.put(
  "/:productId",
  isAuthMiddleware.loginRequired,
  adminMiddleware,
  productController.updateProduct
);

/**
 * @Path : localhost:5000/product/:productId
 * @Method : GET
 * @Access : Public
 * @Description : Get single Product by Id
 */
router.get(
  "/:productId",
  getSingleProductById,
  productController.getSingleProduct
);

/**
 * @Path : localhost:5000/product/list
 * @Method : GET
 * @Access : Public
 * @Description : Get all products
 */
router.get("/list", productController.getAllProducts);

module.exports = router;
