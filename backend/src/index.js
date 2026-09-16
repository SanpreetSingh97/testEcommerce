require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const ensureProductsSeeded = require("./data/ensureProductsSeeded");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await ensureProductsSeeded();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
