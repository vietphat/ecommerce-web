const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const User = require('./../models/User');
const generateJWT = require('./../config/generateJWT');
const generateRefreshToken = require('../config/generateRefreshToken');
const Email = require('../utils/email');

// Kiểm tra nếu sđt đã tồn tại
exports.checkPhoneNumber = catchAsync(async (req, res, next) => {
  const { phoneNumber } = req.params;

  const data = await User.findOne({ phoneNumber });

  let isExisted = false;
  if (data !== null) {
    isExisted = true;
  }

  res.status(200).json({
    status: 'Thành công',
    data: { isExisted },
  });
});

// Kiểm tra nếu email đã tồn tại
exports.checkEmail = catchAsync(async (req, res, next) => {
  const { email } = req.params;

  const data = await User.findOne({ email });

  let isExisted = false;
  if (data !== null) {
    isExisted = true;
  }

  res.status(200).json({
    status: 'Thành công',
    data: {
      isExisted,
    },
  });
});

// Kiểm tra nếu sđt đã tồn tại khi thay đổi thông tin
exports.checkPhoneNumberWhenUpdate = catchAsync(async (req, res, next) => {
  const { phoneNumber } = req.params;

  let isExisted = false;
  if (req.user.phoneNumber === phoneNumber) {
    return res.status(200).json({
      status: 'Thành công',
      data: { isExisted },
    });
  }

  const data = await User.findOne({ phoneNumber });

  if (data !== null) {
    isExisted = true;
  }

  res.status(200).json({
    status: 'Thành công',
    data: {
      isExisted,
    },
  });
});

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

  // gửi email chào mừng đăng ký tài khoản
  await new Email(user, process.env.DEV_DOMAIN).sendWelcome();

  res.status(200).json({
    status: 'Thành công',
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    token: generateJWT(user._id),
  });
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
  const refreshToken = generateRefreshToken(user._id);

  await User.findByIdAndUpdate(
    user._id,
    {
      refreshToken,
    },
    {
      new: true,
    }
  );

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 72 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: 'Thành công',
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
    token: generateJWT(user._id),
  });

  // await createAndSendToken(user, res, req, 200);
});

// Admin login
// Login
exports.adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Kiểm tra nếu người dùng chưa nhập tài khoản hoặc mật khẩu
  if (!email.toLowerCase() || !password) {
    return next(
      new AppError('Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu', 400)
    );
  }

  // 2. Lấy user trong db qua email và check có tồn tại + là admin hay không
  const user = await User.findOne({ email: email.toLowerCase() }).select(
    '+password'
  );

  if (!user || user.role !== 'admin') {
    return next(new AppError('Tài khoản hoặc mật khẩu chưa chính xác', 401));
  }

  // 3. Kiểm tra mật khẩu có chính xác hay không
  if (!(await user.enteredPasswordIsCorrect(password, user.password))) {
    return next(new AppError('Tài khoản hoặc mật khẩu chưa chính xác', 401));
  }

  // 4. Tạo và gửi token
  const refreshToken = generateRefreshToken(user._id);

  await User.findByIdAndUpdate(
    user._id,
    {
      refreshToken,
    },
    {
      new: true,
    }
  );

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 72 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: 'Thành công',
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    token: generateJWT(user._id),
  });

  // await createAndSendToken(user, res, req, 200);
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
// exports.logout = catchAsync(async (req, res, next) => {
//   const { cookies } = req;

//   if (!cookies?.refreshToken) {
//     return next(new AppError('Bạn hiện chưa đăng nhập', 401));
//   }

//   const user = await User.findOne({ refreshToken: cookies.refreshToken });

//   if (user) {
//     await User.findOneAndUpdate(
//       { refreshToken: cookies.refreshToken },
//       { refreshToken: '' }
//     );
//   }

//   res.clearCookie('refreshToken', {
//     httpOnly: true,
//     secure: true,
//   });

//   res.status(200).json({
//     status: 'Đăng xuất thành công',
//   });
// });

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

  await new Email(user).sendChangePasswordSuccessfully();

  res.status(200).json({
    status: 'Thành công',
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    token: generateJWT(user._id),
  });
  // await createAndSendToken(user, res, req, 200);
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
  try {
    const resetPasswordUrl = `${process.env.DEV_DOMAIN}/reset-password/${resetPasswordToken}`;

    await new Email(user, resetPasswordUrl).sendResetPassword();

    // 4. Response
    res.status(200).json({
      status: 'Thành công',
      resetPasswordUrl, // tạm thời, sau này để link trang lấy lại mật khẩu phía frontend
      message:
        'Đã gửi email thay đổi mật khẩu đến người dùng (chỉ có hiệu lực trong 10 phút)',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    console.log(err);

    res.status(500).json({
      status: 'Có lỗi',
      message: 'Không thể gửi email đến người dùng',
    });
  }
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
    await new Email(user).sendChangePasswordSuccessfully();

    // Log the user in
    res.status(200).json({
      status: 'Thành công',
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateJWT(user._id),
    });
    // await createAndSendToken(user, res, req, 200);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Lấy lại mật khẩu thất bại',
      message: error.message,
    });
  }
});

// Hàm xử lý refreshToken
exports.handleRefreshToken = catchAsync(async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) {
    return new AppError('Không tìm thấy refreshToken trong cookies', 401);
  }

  const refreshToken = cookies.refreshToken;

  const user = await User.findOne({ refreshToken });

  if (!user) {
    return new AppError('Không tìm thấy user trong database', 401);
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, (error, decoded) => {
    if (error || user.id !== decoded.id) {
      return new next('Refresh token không hợp lệ', 401);
    }

    const newJsonWebToken = generateJWT(user.id);

    res.status(200).json({
      status: 'Thành công',
      newJsonWebToken,
    });
  });
});
