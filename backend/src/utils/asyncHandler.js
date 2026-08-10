/**
 * Wraps an async route handler so any thrown/rejected error is passed to
 * Express's `next()` instead of crashing the process.
 */
function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
