const Product = require("../modules/product/product.model");
const PRODUCTS = require("./products");

/**
 * Ensures the catalog exists when the API starts.
 * - Seeds when empty
 * - Re-seeds if data still looks like old USD prices (max < 500)
 */
const ensureProductsSeeded = async () => {
  const count = await Product.countDocuments();

  if (count === 0) {
    await Product.insertMany(PRODUCTS);
    console.log(`Auto-seeded ${PRODUCTS.length} products`);
    return;
  }

  const richest = await Product.findOne().sort({ price: -1 }).select("price").lean();
  const looksLikeUsd = richest && richest.price < 500;

  if (looksLikeUsd) {
    await Product.deleteMany({});
    await Product.insertMany(PRODUCTS);
    console.log(`Re-seeded ${PRODUCTS.length} products with INR pricing`);
  } else {
    console.log(`Catalog ready (${count} products)`);
  }
};

module.exports = ensureProductsSeeded;
