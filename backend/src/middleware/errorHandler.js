const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `Duplicate value for ${field}`;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    errors = Object.values(err.errors || {}).map((e) => e.message);
    message = "Validation failed";
  }

  if (!(err instanceof ApiError) && process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
