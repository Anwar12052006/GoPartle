const mongoose = require("mongoose");

/**
 * GET /api/health
 * Returns server status and MongoDB connection state.
 */
const getHealth = (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus =
    { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" }[
      dbState
    ] || "unknown";

  res.status(200).json({
    success: true,
    message: "GoPartle backend is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: dbStatus,
  });
};

module.exports = { getHealth };
