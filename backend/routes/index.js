const express = require("express");
const router = express.Router();


const productsRoute = require("./product.js");
const categoriesRoute = require("./categories.js");
const authRoute = require("./auth.js");
const couponsRoute = require("./coupons.js");
const usersRoute = require("./users.js");
const paymentRoute = require("./payment.js");
const sliderRoute = require("./slider.js");
const orderRoute = require("./order.js");
const likedProductsRoute = require("./likedproducts.js")



router.use("/categories", categoriesRoute);
router.use("/product", productsRoute);
router.use("/auth", authRoute);
router.use("/coupons", couponsRoute);
router.use("/users", usersRoute);
router.use("/payment", paymentRoute);
router.use("/slider", sliderRoute);
router.use("/order", orderRoute);
router.use("/favourite", likedProductsRoute);


module.exports = router;