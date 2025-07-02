import formatResponse from '../utils/response-formatter.js';
import en from '../locale/en.js';

/**
 * Global error handling middleware.
 * Catches all errors and formats them into a consistent JSON response.
 * @param {object} err - The error object.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The Express next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || en['internal-server-error'] || 'An unexpected error occurred.';

  return formatResponse(res, statusCode, null, message);
};

export default errorHandler;