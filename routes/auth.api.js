const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

/**
 * @path : localhost:5000/auth/loginWithEmail
 * @method: GET
 * @access: public
 * @description: authorize with email and password
 */

router.post("/loginWithEmail", authController.loginWithEmail);

module.exports = router;
