const handleError = (error, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    status: statusCode,
    message: error.message || "Something went wrong"
  });
};

module.exports = handleError;
