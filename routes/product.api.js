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
 * @Path : localhost:5000/product/list
 * @Method : GET
 * @Access : Public
 * @Description : Get list of products
 */
router.get("/list", productController.getAllProducts);

/**
 * @Path : localhost:5000/product/search
 * @Method : GET
 * @Access : Public
 * @Description : Get list of products by SEARCH query (buy name and option: category)
 */
router.get("/search", productController.getListProductsBySearch);

/**
 * @Path : localhost:5000/product/filter
 * @Method : GET
 * @Access : Public
 * @Description : Get list of products filtered by category (option: order, sortBy(price, createdAt...), limit)
 */
router.get("/filter", productController.getListProductsByCategoryAndPrice);

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
 * @Method : DELETE
 * @Access : Admin required
 * @Description : Get single Product by Id
 */

router.delete(
  "/:productId",
  isAuthMiddleware.loginRequired,
  adminMiddleware,
  getSingleProductById,
  productController.deleteProduct
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
 * @Path : localhost:5000/product/related/:productId
 * @Method : GET
 * @Access : Public
 * @Description : Get related products
 */

router.get(
  "/related/:productId",
  getSingleProductById,
  productController.getRelatedProducts
);

module.exports = router;
