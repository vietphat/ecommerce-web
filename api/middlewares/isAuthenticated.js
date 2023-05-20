const { promisify } = require('util');

const jwt = require('jsonwebtoken');

const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');

// middleware dùng để ngăn người dùng truy cập khi chưa được xác thực
const isAuthenticated = catchAsync(async (req, res, next) => {
  // 1. Kiểm tra người dùng đã đăng nhập chưa
  let token = '';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt && req.cookies?.jwt !== '') {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('Vui lòng đăng nhập để có quyền truy cập vào route này', 401)
    );
  }

  // 2. Verify jwt
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Kiểm tra user có còn tồn tại hay không
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    // return next(new AppError('Tài khoản không tồn tại', 401));
    return next(
      new AppError('Vui lòng đăng nhập để có quyền truy cập vào route này', 401)
    );
  }

  // 4. Kiểm tra nếu người dùng có thay đổi mật khẩu sau khi token được tạo hay không
  if (currentUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError(
        'Phiên đăng nhập (jsonwebtoken) đã hết hạn. Vui lòng đăng nhập lại',
        401
      )
    );
  }

  req.user = currentUser;
  next();
});

module.exports = isAuthenticated;
