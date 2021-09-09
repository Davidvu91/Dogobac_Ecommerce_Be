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

/**Product Router */
const productRoute = require("./product.api");
router.use("/product", productRoute);

/**Review Router */
const reviewRoute = require("./review.api");
router.use("/review", reviewRoute);

module.exports = router;
