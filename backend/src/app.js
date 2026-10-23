const express = require("express");
const cors = require("cors");
const config = require("./config");

const { getHealth } = require("./controllers/healthController");

// Route imports
const healthRoutes = require("./routes/healthRoutes");
const requirementRoutes = require("./routes/requirementRoutes");

// Middleware imports
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ── Global middleware ────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.frontendOrigin,
    credentials: true,
  })
);

// ── Health Check Endpoints (Registered before 404 catch-all) ──
// Direct root and /api/health bindings for Render, Docker, and frontend clients
app.get("/api/health", getHealth);
app.get("/health", getHealth);
app.get("/", getHealth);
app.use("/api/health", healthRoutes);

// ── Application Routes ───────────────────────────────────────
app.use("/api/requirements", requirementRoutes);

// ── Error handling (must be last) ────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
