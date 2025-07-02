/**
 * Formats and sends a consistent JSON response.
 * Can be used for both success and error responses.
 * For errors, pass `null` as the data payload and provide an error message.
 *
 * @param {object} res - The Express response object.
 * @param {number} statusCode - The HTTP status code.
 * @param {object|null} [data] - The data payload for success responses, or null for errors.
 * @param {string} [message='Success'] - The response message.
 */
const formatResponse = (res, statusCode, data, message = 'Success') => {
  const response = {
    status: statusCode,
    message,
  };

  // Only include the data key if data is provided
  if (data !== undefined && data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

export default formatResponse;