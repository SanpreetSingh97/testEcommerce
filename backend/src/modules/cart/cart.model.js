const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
