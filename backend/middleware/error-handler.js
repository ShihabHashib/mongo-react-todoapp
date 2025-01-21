const errorHandler = (err, req, res, next) => {
  // Don't send error response if headers are already sent or request is aborted
  if (res.headersSent || req.aborted) {
    return next(err);
  }

  const error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error(err);

  // Handle client disconnection
  if (err.name === "ECONNRESET" || err.code === "ECONNRESET") {
    return;
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    return res.status(404).json({ message });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    return res.status(400).json({ message });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ message });
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Server Error",
  });
};

module.exports = errorHandler;
