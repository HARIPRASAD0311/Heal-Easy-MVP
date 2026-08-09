const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// GET /api/health
router.get("/", (req, res) => {
  const dbState = mongoose.connection.readyState;
  // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  const dbStatus = dbState === 1 ? "connected" : "disconnected";

  res.status(200).json({
    success: true,
    message: "HealEasy backend is running",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
