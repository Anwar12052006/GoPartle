const mongoose = require("mongoose");
const config = require("./index");

/**
 * Sanitize MongoDB URI to mask credentials in logs
 */
const sanitizeUri = (uri) => {
  if (!uri) return "";
  try {
    return uri.replace(/\/\/([^:]+):([^@]+)@/, "//$1:****@");
  } catch {
    return "[hidden-uri]";
  }
};

/**
 * Connect to MongoDB using the URI from environment variables.
 * Handles database connection failures safely without crashing the server.
 */
const connectDB = async () => {
  const primaryUri = config.mongoUri;
  const localFallbackUri = "mongodb://localhost:27017/gopartle";

  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[DB] Connected successfully to: ${sanitizeUri(primaryUri)} (Host: ${conn.connection.host})`);
  } catch (primaryError) {
    console.error(`[DB WARNING] Primary MongoDB connection failed: ${primaryError.message}`);

    // If primary was Atlas or external and local fallback is different, attempt local fallback
    if (primaryUri !== localFallbackUri) {
      try {
        console.log(`[DB] Attempting fallback to local MongoDB (${localFallbackUri})...`);
        const fallbackConn = await mongoose.connect(localFallbackUri, {
          serverSelectionTimeoutMS: 3000,
        });
        console.log(`[DB] Fallback connected to local MongoDB: ${fallbackConn.connection.host}`);
        return;
      } catch (fallbackError) {
        console.error(`[DB WARNING] Fallback connection failed: ${fallbackError.message}`);
      }
    }

    console.warn("[DB WARNING] Server continuing with MongoDB in disconnected state. Operations requiring DB will safely return 503 until reconnected.");
  }
};

module.exports = connectDB;
