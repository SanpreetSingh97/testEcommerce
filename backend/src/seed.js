require("dotenv").config();

const connectDB = require("./config/db");
const Product = require("./modules/product/product.model");
const PRODUCTS = require("./data/products");

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    const created = await Product.insertMany(PRODUCTS);
    console.log(`Seeded ${created.length} products (INR)`);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
