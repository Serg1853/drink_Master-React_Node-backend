// const messageList = {
//   400: "Bad Request",
//   401: "Unauthorized",
//   403: "Forbidden",
//   404: "Not Found",
//   409: "Conflict",
// };

// const HttpError = (status, message = messageList[status]) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };

// module.exports = HttpError;

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = HttpError;
