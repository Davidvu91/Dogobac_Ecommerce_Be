const express = require("express");
const categoryController = require("../controllers/category.controller");
const adminMiddleware = require("../middlewares/admin.middleware");
const isAuthMiddleware = require("../middlewares/isAuth.middleware");
const router = express.Router();

/**
 * @Path : localhost:5000/caterory/create
 * @Method : POST
 * @Access : admin
 * @Description : Create a User Account with Email and Password
 */
router.post(
  "/create",
  isAuthMiddleware.loginRequired,
  adminMiddleware,
  categoryController.create
);

module.exports = router;
