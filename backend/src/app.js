const express = require("express");
const cors = require("cors");

const patientsRoutes = require("./routes/patients.routes");
const hospitalsRoutes = require("./routes/hospitals.routes");
const consultationsRoutes = require("./routes/consultations.routes");
const aiRoutes = require("./routes/ai.routes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

function createApp() {
  const app = express();

  const allowedOrigins = (process.env.CORS_ORIGIN || "*")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: allowedOrigins.includes("*") ? true : allowedOrigins,
    })
  );
  app.use(express.json({ limit: "2mb" }));

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/api/patients", patientsRoutes);
  app.use("/api/hospitals", hospitalsRoutes);
  app.use("/api/consultations", consultationsRoutes);
  app.use("/api/ai", aiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
