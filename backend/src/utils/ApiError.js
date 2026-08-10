/**
 * Lightweight error class carrying an HTTP status code, so route handlers
 * can `throw new ApiError(404, "Patient not found")` and let the central
 * error handler turn it into the right response.
 */
class ApiError extends Error {
  constructor(statusCode, message, details = undefined) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

module.exports = ApiError;
