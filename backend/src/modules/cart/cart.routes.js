const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const { getCart, addToCart, updateCartItem } = require("./cart.controller");

const router = express.Router();

router.post("/", asyncHandler(addToCart));
router.get("/:id", asyncHandler(getCart));
router.put("/:id", asyncHandler(updateCartItem));

module.exports = router;
