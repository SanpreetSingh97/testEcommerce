const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true,
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
