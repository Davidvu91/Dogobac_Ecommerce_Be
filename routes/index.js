var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Landing Page" });
});

/**Auth Router */
const authRoute = require("./auth.api");
router.use("/auth", authRoute);

/**User routes */
const userRoute = require("./user.api");
router.use("/user", userRoute);

/**Category Router */
const categoryRoute = require("./category.api");
router.use("/category", categoryRoute);

module.exports = router;
