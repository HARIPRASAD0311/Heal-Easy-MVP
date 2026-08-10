const ApiError = require("../utils/ApiError");

function notFoundHandler(req, res) {
  res.status(404).json({
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }

  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal server error." });
}

module.exports = { notFoundHandler, errorHandler };
