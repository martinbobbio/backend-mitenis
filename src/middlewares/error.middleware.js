const logger = require('../utils/logger');

/* eslint-disable-next-line */
const errorHandler = (err, req, res, next) => {
  const error = { ...err };
  error.message = err.message;

  /* axios error response */
  if (error.response) {
    error.statusCode = error.response.status;
    error.message =
      error.response.data.errors &&
      error.response.data.errors.map((e) => e.message || e.detail);
  }

  /* eslint-disable-next-line */
  logger.error(error.message, { statusCode: error.statusCode });

  return res.status(error.statusCode || 503).json({
    success: false,
    status: error.statusCode || 503,
    error: error.message || 'Service Unavailable.'
  });
};

module.exports = errorHandler;
