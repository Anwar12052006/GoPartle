const app = require("./app");
const config = require("./config");
const connectDB = require("./config/db");

/**
 * Start the server:
 * 1. Connect to MongoDB
 * 2. Listen on the configured port
 */
const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(
      `Server running in ${config.nodeEnv} mode on http://localhost:${config.port}`
    );
  });
};

startServer();
