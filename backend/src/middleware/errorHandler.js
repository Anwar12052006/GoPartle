/**
 * Sanitize error messages to ensure database credentials or URIs are never exposed
 */
const sanitizeErrorMessage = (msg) => {
  if (!msg || typeof msg !== "string") return "An unexpected error occurred";
  return msg.replace(/mongodb(\+srv)?:\/\/[^@]+@/gi, "mongodb$1://****@");
};

/**
 * Centralised error-handling middleware.
 * Must be registered AFTER all routes.
 */
const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = sanitizeErrorMessage(err.message || "Internal Server Error");

  // Handle Mongoose CastError (e.g. bad ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value '${err.value}' for field '${err.path}'`;
  }

  // Handle malformed JSON body parser syntax errors
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    statusCode = 400;
    message = "Malformed JSON payload in request body";
  }

  // Handle MongoServerErrors / Connection timeouts
  if (err.name === "MongoServerSelectionError" || err.name === "MongoNetworkError") {
    statusCode = 503;
    message = "Database service is temporarily unavailable. Please try again later.";
  }

  console.error(`[ERROR] ${statusCode} – ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      name: err.name,
      stack: sanitizeErrorMessage(err.stack),
    }),
  });
};

module.exports = errorHandler;
