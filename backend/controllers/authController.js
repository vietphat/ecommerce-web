const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppErorr');
const User = require('../models/User');

exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, phoneNumber, email, password, confirmPassword } =
    req.body;

  // tạo tài khoản
  const user = await User.create({
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    confirmPassword,
  });

  // ẩn trường password khi trả dữ liệu về client
  user.password = undefined;

  res.status(201).json({
    status: 'Thành công',
    message: 'Tạo tài khoản thành công',
    data: {
      user,
    },
  });
});
