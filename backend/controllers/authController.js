const crypto = require('crypto');
const { promisify } = require('util');

const jwt = require('jsonwebtoken');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/User');

// Register
exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, phoneNumber, email, password, confirmPassword } =
    req.body;

  // tạo tài khoản
  const user = await User.create({
    firstName,
    lastName,
    phoneNumber,
    email: email?.toLowerCase(),
    password,
    confirmPassword,
  });

  // ẩn trường password khi trả dữ liệu về client
  user.password = undefined;

  await createAndSendToken(user, res, req, 201);
});

// Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Kiểm tra nếu người dùng chưa nhập tài khoản hoặc mật khẩu
  if (!email.toLowerCase() || !password) {
    return next(
      new AppError('Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu', 400)
    );
  }

  // 2. Lấy user trong db qua email
  const user = await User.findOne({ email: email.toLowerCase() }).select(
    '+password'
  );

  if (!user) {
    return next(new AppError('Tài khoản hoặc mật khẩu chưa chính xác', 401));
  }

  // 3. Kiểm tra mật khẩu có chính xác hay không
  if (!(await user.enteredPasswordIsCorrect(password, user.password))) {
    return next(new AppError('Tài khoản hoặc mật khẩu chưa chính xác', 401));
  }

  // 4. Tạo và gửi token
  await createAndSendToken(user, res, req, 200);
});

// Login with google account
exports.signinWithGoogleAccount = catchAsync(async (req, res, next) => {
  // const { email, username } = req.body;
  // const user = await User.findOne({ email });
  // if (user) {
  //   await createAndSendToken(user, res, req, 200);
  // } else {
  //   const newUser = new User({ email, username, fromGoogleAccount: true });
  //   const savedUser = await newUser.save({ validateBeforeSave: false });
  //   // await new Email(savedUser, process.env.DEV_DOMAIN).sendWelcome();
  //   await createAndSendToken(savedUser, res, req, 200);
  // }
});

// Logout
exports.logout = catchAsync(async (req, res, next) => {
  // xóa cookie jwt và cho nó hết hạn ngay lập tức
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() - 3 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'Đăng xuất thành công',
  });
});

// Change password
exports.changeMyPassword = catchAsync(async (req, res, next) => {
  const { currentPassword, password, confirmPassword } = req.body;
  const user = await User.findOne({
    email: req.user.email.toLowerCase(),
  }).select('firstName lastName email password');

  if (!(await user.enteredPasswordIsCorrect(currentPassword, user.password))) {
    return next(new AppError('Mật khẩu hiện tại không chính xác', 401));
  }

  user.password = password;
  user.confirmPassword = confirmPassword;
  await user.save();

  // await new Email(user).sendChangePasswordSuccessfully();

  await createAndSendToken(user, res, req, 200);
});

// Forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  // 1. Lấy thông tin user thông qua email
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('Không tìm thấy tài khoản', 400));
  }

  // 2. Tạo reset password token
  const resetPasswordToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // 3. Gửi reset password token to email của người dùng
  // tempory solution
  const resetPasswordUrl = `${process.env.DEV_DOMAIN}/reset-password/${resetPasswordToken}`;

  res.status(200).json({
    status: 'Thành công',
    resetPasswordUrl, // tạm thời
    message: `Tạm thời chưa gửi mail...`,
  });
  // try {
  //   const resetPasswordUrl = `${process.env.DEV_DOMAIN}/reset-password/${resetPasswordToken}`;

  //   await new Email(user, resetPasswordUrl).sendResetPassword();

  //   // 4. Response
  //   res.status(200).json({
  //     status: 'Thành công',
  //     resetPasswordUrl, // tạm thời
  //     message: 'Đã gửi email thay đổi mật khẩu đến người dùng',
  //   });
  // } catch (err) {
  //   user.passwordResetToken = undefined;
  //   user.passwordResetExpires = undefined;
  //   await user.save({ validateBeforeSave: false });

  //   console.log(err);

  //   res.status(500).json({
  //     status: 'Có lỗi',
  //     message: 'Không thể gửi email đến người dùng',
  //   });
  // }
});

// Reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // Lấy và hash resetPasswordToken
  let { resetPasswordToken } = req.params;
  resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetPasswordToken)
    .digest('hex');

  // Lấy user thông qua resetPasswordToken
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpiresIn: { $gt: Date.now() },
  });

  // Kiểm tra xem reset password token có chính xác và còn hạn sử dụng hay không
  if (!user) {
    return next(
      new AppError(
        'Reset password token không chính xác hoặc đã hết thời gian hiệu lực',
        401
      )
    );
  }

  // Lưu mật khẩu mới
  const { password, confirmPassword } = req.body;
  user.password = password;
  user.confirmPassword = confirmPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiresIn = undefined;
  try {
    await user.save();
    //send email
    // await new Email(user).sendChangePasswordSuccessfully();

    // Log the user in
    await createAndSendToken(user, res, req, 200);
  } catch (error) {
    res.status(500).json({
      status: 'Lấy lại mật khẩu thất bại',
      message: error.message,
    });
  }
});

// Hàm tạo jsonwebtoken
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Hàm tạo và gửi jsonwebtoken qua json
const createAndSendToken = async (user, res, req, statusCode) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'Thành công',
    token,
    data: user,
  });
};
