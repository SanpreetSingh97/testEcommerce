const mongoose = require("mongoose");
const ApiResponse = require("../../utils/ApiResponse");

const getHealth = async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        status: "ok",
        database: dbStatusMap[dbState] || "unknown",
        uptime: process.uptime(),
      },
      "API is healthy"
    )
  );
};

module.exports = {
  getHealth,
};
