const sendErrorDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
};

exports.globalErrorHandler = (err, req, res, next) => {
  console.log('error stack: ', err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Có lỗi';

  sendErrorDev(err, req, res);
};
