var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Landing Page" });
});

/**User routes */
const userRoute = require("./user.api");
router.use("/user", userRoute);

/**Auth Router */
const authRoute = require("./auth.api");
router.use("/auth", authRoute);

module.exports = router;
