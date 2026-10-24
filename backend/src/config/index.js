require("dotenv").config();

const defaultAllowedOrigins = [
  "https://go-partle-beige.vercel.app",
  "https://go-partle-c90721ea3-anwar-razas-projects.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const parseAllowedOrigins = () => {
  const list = [...defaultAllowedOrigins];
  if (process.env.FRONTEND_ORIGIN) {
    const fromEnv = process.env.FRONTEND_ORIGIN.split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, "").replace(/\/$/, ""))
      .filter(Boolean);
    fromEnv.forEach((origin) => {
      if (!list.includes(origin)) {
        list.push(origin);
      }
    });
  }
  return list;
};

/**
 * Centralised configuration object.
 * All env-var reads happen here so the rest of the app
 * only imports this module.
 */
const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/gopartle",
  frontendOrigin: process.env.FRONTEND_ORIGIN || "https://go-partle-beige.vercel.app",
  allowedOrigins: parseAllowedOrigins(),
};

module.exports = config;
