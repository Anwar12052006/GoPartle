require("dotenv").config();

/**
 * Centralised configuration object.
 * All env-var reads happen here so the rest of the app
 * only imports this module.
 */
const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/gopartle",
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
};

module.exports = config;
