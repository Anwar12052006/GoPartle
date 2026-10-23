const app = require("./app");
const config = require("./config");
const connectDB = require("./config/db");

const PORT = process.env.PORT || config.port || 5000;

/**
 * Start the server:
 * 1. Connect to MongoDB
 * 2. Listen on the configured port across all network interfaces (0.0.0.0)
 */
const startServer = async () => {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Server running in ${config.nodeEnv} mode on port ${PORT}`
    );
  });
};

startServer();
