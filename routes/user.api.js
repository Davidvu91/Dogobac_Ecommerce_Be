const express = require("express");
const userController = require("../controllers/user.controller");
const adminMiddleware = require("../middlewares/admin.middleware");
const getSingleUserById = require("../middlewares/getSingleUser");
const isAuthMiddleware = require("../middlewares/isAuth.middleware");
const router = express.Router();

/**
 * @Path : localhost:5000/user/getall
 * @Method : GET
 * @Access : Admin required
 * @Description : Get All existed user account
 */

router.get(
  "/getall",
  isAuthMiddleware.loginRequired,
  adminMiddleware,
  userController.getAllUserInfo
);

/**
 * @Path : localhost:5000/user/getbydade
 * @Method : GET
 * @Access : Admin required
 * @Description : Get amount of user in the lated date
 */

router.get(
  "/getamount",
  isAuthMiddleware.loginRequired,
  adminMiddleware,
  userController.getAmountOfUserByDate
);

/**
 * @Path : localhost:5000/user/create
 * @Method : POST
 * @Access : public
 * @Description : Create a User Account with Email and Password
 */

router.post("/create", userController.createAccountWithEmail);

/**
 * @Path : localhost:5000/user/update
 * @Method : PUT
 * @Access : Login requred
 * @Description : Update existed user account
 */

router.put(
  "/update",
  isAuthMiddleware.loginRequired,
  userController.updateUserInfo
);

/**
 * @Path : localhost:5000/user/delete
 * @Method : DELETE
 * @Access : Login requred
 * @Description : Delete existed user account
 */

router.delete(
  "/delete",
  isAuthMiddleware.loginRequired,
  userController.deleteUserInfo
);

/**
 * @Path : localhost:5000/user/info
 * @Method : GET
 * @Access : Login required
 * @Description : Get single user info
 */

router.get(
  "/info",
  isAuthMiddleware.loginRequired,
  getSingleUserById,
  userController.getSingleUserInfo
);

module.exports = router;
