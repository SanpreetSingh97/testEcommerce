const express = require("express");
const healthRoutes = require("../modules/health/health.routes");
const productRoutes = require("../modules/product/product.routes");
const cartRoutes = require("../modules/cart/cart.routes");

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);

module.exports = router;
