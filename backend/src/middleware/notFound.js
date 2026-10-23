/**
 * Catch-all 404 middleware.
 * Registered after all valid routes so unmatched paths
 * fall through to the centralized error handler.
 */
const notFound = (req, _res, next) => {
  const error = new Error(`Not Found – ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = notFound;
