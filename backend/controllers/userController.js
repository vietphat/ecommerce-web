const AppError = require('../utils/AppError');
const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');
const validateMongoDbId = require('./../config/validateMongoDbId');

/// A. Client
// Update my data
exports.updateMyData = catchAsync(async (req, res, next) => {
  // Ngăn cập nhật mật khẩu bằng route này
  if (req.body.password) {
    return next(
      new AppError(
        'Không thể thay đổi mật khẩu bằng route này. Thử /api/auth/change-password.',
        400
      )
    );
  }

  // Ngăn việc tự cập nhật quyền (role)
  if (req.body.role || req.body.isBlocked) {
    return next(
      new AppError(
        'Bạn không được phép thay đổi thông tin quyền và trạng thái tài khoản',
        400
      )
    );
  }

  const { firstName, lastName, avatarUrl, phoneNumber } = req.body;

  // Cập nhật và lưu vào db
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      firstName,
      lastName,
      avatarUrl:
        avatarUrl === ''
          ? 'https://firebasestorage.googleapis.com/v0/b/social-media-web-1648d.appspot.com/o/users%2Favatars%2Fdefault-avatar.jpg?alt=media&token=fe149b52-bf43-4711-ad59-5b1745d6f0ef'
          : avatarUrl,
      phoneNumber,
    },
    {
      runValidators: true,
      new: true, // tránh thay đổi trường passwordChangedAt
    }
  );

  res.status(200).json({
    status: 'Cập nhật thành công',
    data: user,
  });
});

// Delete my account
exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user._id);

  // // xóa cookie jwt
  // res.cookie('jwt', 'loggedout', {
  //   expires: new Date(Date.now() - 3 * 1000),
  //   httpOnly: true,
  // });

  res.status(201).json({
    status: 'Thành công',
    user,
  });
});

/// B. Management
// Get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'Thành công',
    data: {
      users,
    },
  });
});

// Get a user
exports.getAUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ hoặc không tim thấy người dùng'));
  }

  const user = await User.findById(id);

  if (!user) {
    return next(
      new AppError(`Không tìm thấy người dùng nào có id là ${id}`),
      400
    );
  }

  res.status(200).json({
    status: 'Thành công',
    data: {
      user,
    },
  });
});

// Get users by name or email
exports.getUsersByNameOrEmail = catchAsync(async (req, res, next) => {
  const { searchInput } = req.params;

  const users = await User.find({
    $or: [
      {
        firstName: { $regex: searchInput, $options: 'i' },
      },
      {
        lastName: { $regex: searchInput, $options: 'i' },
      },
      {
        email: { $regex: searchInput, $options: 'i' },
      },
    ],
  });

  res.status(200).json({
    status: 'Thành công',
    length: users.length,
    data: users,
  });
});

// Create user
exports.createAUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, phoneNumber, avatarUrl, email, password, role } =
    req.body;

  const user = await User.create({
    firstName,
    lastName,
    phoneNumber,
    avatarUrl,
    email: email.toLowerCase(),
    password,
    confirmPassword: password,
    role,
  });

  res.status(200).json({
    status: 'Tạo người dùng thành công',
    data: {
      user,
    },
  });
});

// Update user
exports.updateAUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ hoặc không tim thấy người dùng'));
  }

  const {
    firstName,
    lastName,
    phoneNumber,
    avatarUrl,
    email,
    role,
    active,
    password,
  } = req.body;

  let user = await User.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      phoneNumber,
      avatarUrl,
      email: email?.toLowerCase(),
      role,
      active,
    },
    {
      runValidators: true,
      new: true,
    }
  );

  if (password) {
    user.password = password;
    user.confirmPassword = password;

    user = await user.save();
  }

  return res.status(200).json({
    status: 'Cập nhật thông tin thành công',
    data: {
      user,
    },
  });
});

// Delete user
exports.deleteAUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ hoặc không tim thấy người dùng'));
  }

  await User.findByIdAndDelete(id);

  res.status(200).json({
    status: 'Xóa người dùng thành công',
    data: null,
  });
});

// Block user
exports.blockAUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ hoặc không tim thấy người dùng'));
  }

  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  );

  res.status(200).json({
    status: 'Chặn người dùng thành công',
    data: user,
  });
});

// Unblock user
exports.unblockAUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ hoặc không tim thấy người dùng'));
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  );

  res.status(200).json({
    status: 'Bỏ chặn người dùng thành công',
    data: user,
  });
});
