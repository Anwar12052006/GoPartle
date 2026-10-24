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

// ── CORS Configuration (Registered before all routes and parsers) ──
const isOriginAllowed = (origin) => {
  if (!origin) return true;
  const normalized = origin.replace(/\/$/, "");

  // Match explicitly allowed list or wildcard
  if (config.allowedOrigins.includes("*") || config.allowedOrigins.includes(normalized)) {
    return true;
  }

  // Allow all Vercel deployment, branch, and preview URLs (*.vercel.app)
  if (/^https:\/\/([a-zA-Z0-9-]+\.)*vercel\.app$/.test(normalized)) {
    return true;
  }

  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (server-to-server, curl, mobile)
    if (!origin) {
      return callback(null, true);
    }

    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }

    // Origin not allowed: omit Allow-Origin header so browser blocks cross-origin access
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "X-Requested-With",
    "Origin",
  ],
  optionsSuccessStatus: 204,
  maxAge: 86400, // Cache preflight for 24h
};

app.use(cors(corsOptions));

// ── Global body parsers ──────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
