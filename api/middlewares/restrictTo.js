const AppError = require('../utils/AppError');

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('Bạn không có quyền truy cập vào route này.', 401)
      );
    }
    next();
  };
};

module.exports = restrictTo;
