const express = require("express");
const { route } = require("../app");
const userController = require("../controllers/user.controller");
const isAuthMiddleware = require("../middlewares/isAuth.middleware");
const router = express.Router();

/**
 * @Path : localhost:5000/user/create
 * @Method : POST
 * @Access : public
 * @Description : Create a User Account with Email and Password
 */

router.post("/create", userController.createAccountWithEmail);

/**
 * @Path : localhost:5000/user/update
 * @Method : POST
 * @Access : public
 * @Description : Create a User Account with Email and Password
 */

router.put(
  "/update",
  isAuthMiddleware.loginRequired,
  userController.updateUserInfo
);

module.exports = router;
