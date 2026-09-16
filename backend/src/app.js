const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { notFound, errorHandler, requestLogger } = require("./middleware");
const routes = require("./routes");

const app = express();

// Security & parsing middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== "test") {
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(requestLogger);
}

// Root
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "E-commerce API is running",
    version: "1.0.0",
  });
});

// API routes (modular)
app.use("/api", routes);

// 404 + centralized error handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
