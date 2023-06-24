const uniqid = require('uniqid');

const User = require('./../models/User');
const Cart = require('./../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const validateMongoDbId = require('./../config/validateMongoDbId');
const Email = require('../utils/email');

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

  const { firstName, lastName, phoneNumber, address } = req.body;

  // Cập nhật và lưu vào db
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      firstName,
      lastName,
      phoneNumber,
      address,
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

// Get Wishlist
exports.getWishlist = catchAsync(async (req, res, next) => {
  const foundUser = await User.findById(req.user._id).populate('wishlist');

  if (!foundUser) {
    return next(new AppError('Không tìm thấy người dùng', 400));
  }

  const { wishlist } = foundUser;

  res.status(200).json({
    status: 'Thành công',
    data: wishlist,
  });
});

// Save address
exports.saveAddress = catchAsync(async (req, res, next) => {
  const { address } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      address,
    },
    { new: true }
  );

  if (!user) {
    return next(new AppError('Không tìm thấy user', 400));
  }

  res.status(200).json({
    status: 'Thành công',
    data: user,
  });
});

// Add To Cart
exports.addToCart = catchAsync(async (req, res, next) => {
  const { product, color, quantity, price } = req.body;
  const { _id } = req.user;

  // tạo cart và lưu vào db
  const cart = await new Cart({
    user: _id,
    product,
    color,
    quantity,
    price,
  }).save();

  const data = await cart.populate('product color');

  res.status(200).json({
    status: 'Thành công',
    data,
  });
});

// Get User Cart
exports.getUserCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.find({ user: req.user._id });

  res.status(200).json({
    status: 'Thành công',
    data: cart,
  });
});

// Update cart quantity
exports.updateCartQuantity = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findByIdAndUpdate(id, { quantity }, { new: true });

  res.status(200).json({
    status: 'Thành công',
    data: cart,
  });
});

// Empty User Cart
exports.emptyUserCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const cart = await Cart.findOneAndDelete({ _id: id, user: req.user._id });

  res.status(200).json({
    status: 'Thành công',
    data: cart,
  });
});

// ĐẶT HÀNG
// Create Order
exports.createOrder = catchAsync(async (req, res, next) => {
  const {
    shippingInfo,
    paymentMethod,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
    paid,
  } = req.body;
  const { _id } = req.user;

  const order = await Order.create({
    user: _id,
    shippingInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
    paymentMethod,
    paid,
  });

  const data = await order.populate('orderItems.product orderItems.color');

  // Giảm số lượng và tăng số lượng đã bán của sản phẩm
  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (!product) {
      // Handle product not found error if needed
      return res.status(400).json({
        status: 'Thất bại',
        message: 'Sản phẩm không còn tồn tại',
      });
    }

    // Giảm số lượng
    product.quantity -= item.quantity;

    // Tăng số lượng đã bán
    product.sold += item.quantity;

    await product.save();
  }

  const url = `${process.env.DEV_CLIENT_DOMAIN}/orders`;

  await new Email(req.user, url).sendCreateOrderSuccessfully();

  res.status(200).json({
    status: 'Thành công',
    data,
  });
});

exports.deleteCartsAfterOrder = catchAsync(async (req, res, next) => {
  const { cartIds } = req.body;

  const data = await Cart.deleteMany({ _id: { $in: cartIds } });

  res.status(200).json({
    status: 'Thành công',
    data,
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  const data = await Order.find({ user: _id }).sort('-createdAt');

  res.status(200).json({
    status: 'Thành công',
    length: data.length,
    data,
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

// Get all customers
exports.getAllCustomers = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: { $ne: 'admin' } });

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
    data: user,
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
    data: user,
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

// lấy thu nhập hàng tháng
exports.getMonthlyIncomeReport = catchAsync(async (req, res, next) => {
  const monthsArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let date = new Date();
  let endDate = '';
  date.setDate(1);

  for (let i = 0; i < 11; i++) {
    date.setMonth(date.getMonth() - 1);
    endDate = monthsArr[date.getMonth()] + ' ' + date.getFullYear();
  }

  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          month: '$month',
        },
        amount: {
          $sum: '$totalPriceAfterDiscount',
        },
        totalOrders: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: 'Thành công',
    data,
  });
});

// lấy tổng hóa đơn hàng năm
exports.getYearlyIncomeReport = catchAsync(async (req, res, next) => {
  const monthsArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let date = new Date();
  let endDate = '';
  date.setDate(1);

  for (let i = 0; i < 11; i++) {
    date.setMonth(date.getMonth() - 1);
    endDate = monthsArr[date.getMonth()] + ' ' + date.getFullYear();
  }

  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalAmountEarned: { $sum: '$totalPriceAfterDiscount' },
      },
    },
  ]);

  res.status(200).json({
    status: 'Thành công',
    data,
  });
});
