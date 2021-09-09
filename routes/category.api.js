const express = require("express");
const categoryController = require("../controllers/category.controller");
const adminMiddleware = require("../middlewares/admin.middleware");
const getSingleCategoryById = require("../middlewares/getSingleCategory");
const isAuthMiddleware = require("../middlewares/isAuth.middleware");
const router = express.Router();

/**
 * @Path : localhost:5000/caterory/create
 * @Method : POST
 * @Access : admin
 * @Description : Create Category
 */
router.post(
  "/create",
  isAuthMiddleware.loginRequired,
  adminMiddleware,
  categoryController.createCategory
);

/**
 * @Path : localhost:5000/caterory/:categoryId
 * @Method : PUT
 * @Access : admin
 * @Description : Update a category
 */
router.put(
  "/:categoryId",
  isAuthMiddleware.loginRequired,
  adminMiddleware,
  getSingleCategoryById,
  categoryController.updateCategory
);

/**
 * @Path : localhost:5000/caterory/:categoryId
 * @Method : DELETE
 * @Access : admin
 * @Description : Delete acategory
 */
router.delete(
  "/:categoryId",
  isAuthMiddleware.loginRequired,
  adminMiddleware,
  categoryController.deleteCategory
);

/**
 * @Path : localhost:5000/caterory/getAll
 * @Method : POST
 * @Access : public
 * @Description : Get all category
 */
router.get("/getAll", categoryController.takeCategory);

/**
 * @Path : localhost:5000/caterory/:categoryId
 * @Method : GET
 * @Access : public
 * @Description : Get single category
 */
router.get(
  "/:categoryId",
  getSingleCategoryById,
  categoryController.getSingleCategory
);

module.exports = router;
