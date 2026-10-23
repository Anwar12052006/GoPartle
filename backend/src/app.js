const express = require("express");
const cors = require("cors");
const config = require("./config");

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

// ── Routes ───────────────────────────────────────────────────
app.use("/api/health", healthRoutes);
app.use("/api/requirements", requirementRoutes);

// ── Error handling (must be last) ────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
