const express = require("express");
const userController = require("../controllers/user.controller");
const adminMiddleware = require("../middlewares/admin.middleware");
const getSingleUserById = require("../middlewares/getSingleUser");
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
 * @Path : localhost:5000/user/:userId
 * @Method : PUT
 * @Access : Login requred
 * @Description : Update existed user account
 */

router.put(
  "/:userId",
  isAuthMiddleware.loginRequired,
  userController.updateUserInfo
);

/**
 * @Path : localhost:5000/user/:userId
 * @Method : DELETE
 * @Access : Login requred
 * @Description : Delete existed user account
 */

router.delete(
  "/:userId",
  isAuthMiddleware.loginRequired,
  userController.deleteUserInfo
);

/**
 * @Path : localhost:5000/user/:userId
 * @Method : GET
 * @Access : Login required
 * @Description : Get single user info
 */

router.get(
  "/:userId",
  isAuthMiddleware.loginRequired,
  getSingleUserById,
  userController.getSingleUserInfo
);

/**
 * @Path : localhost:5000/user/getAll
 * @Method : GET
 * @Access : Admin required
 * @Description : Get All existed user account
 */

router.get(
  "/getAll",
  isAuthMiddleware.loginRequired,
  adminMiddleware,
  userController.getAllUserInfo
);

module.exports = router;
