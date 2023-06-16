const uniqid = require('uniqid');

const User = require('./../models/User');
const Cart = require('./../models/Cart');
const Product = require('./../models/Product');
const Coupon = require('./../models/Coupon');
const Order = require('../models/Order');
const AppError = require('../utils/AppError');
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

// Update quantity
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

// Apply coupon
exports.applyCoupon = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { coupon } = req.body;

  // Kiểm tra xem coupon có và còn hạn hay không
  const couponIsValid = await Coupon.findOne({
    name: coupon,
    expiry: { $gt: new Date(Date.now()).toISOString() },
  });

  if (!couponIsValid) {
    return next(
      new AppError(
        'Coupon đã hết hạn hoặc không hợp lệ. Vui lòng thử lại sau.',
        400
      )
    );
  }

  // Lấy giỏ hàng trong db ra để tính giá sau khi áp dụng phiếu giảm giá
  const cart = await Cart.findOne({ createdBy: userId });

  if (!cart) {
    return next(new AppError('Không tìm thấy giỏ hàng', 400));
  }

  const totalAfterDiscount =
    cart.cartTotal - (cart.cartTotal * couponIsValid.discount) / 100;
  cart.totalAfterDiscount = totalAfterDiscount;
  await cart.save();

  res.status(200).json({
    status: 'Thành công',
    data: cart,
  });
});

// Create Order
exports.createOrder = catchAsync(async (req, res, next) => {
  const { COD, couponApplied } = req.body;
  const { _id: userId } = req.user;

  if (!COD) {
    return next(new AppError('Không thể tạo đơn hàng', 400));
  }

  const cart = await Cart.findOne({ createdBy: userId });

  let amount;
  if (couponApplied && cart.totalAfterDiscount) {
    amount = cart.totalAfterDiscount;
  } else {
    amount = cart.cartTotal;
  }

  // lưu hóa đơn
  const order = await new Order({
    products: cart.products,
    paymentIntent: {
      id: uniqid(),
      method: 'COD',
      amount,
      status: 'Chưa xử lý',
      createdAt: Date.now(),
      currency: 'VND',
    },
    orderStatus: 'Chưa xử lý',
    orderBy: userId,
  }).save();

  // giảm số lượng sản phẩm, tăng số lượng đã bán
  const update = cart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  await Product.bulkWrite(update, {});

  res.status(200).json({
    status: 'Thành công',
    data: order,
  });
});

// Get orders
exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ orderBy: req.user._id }).populate(
    'products.product',
    'title price'
  );

  if (!orders) {
    return next(new AppError('Không có đơn hàng', 400));
  }

  res.status(200).json({
    status: 'Thành công',
    length: orders.length,
    data: orders,
  });
});

// Update Order Status
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { id: orderId } = req.params;
  const { status } = req.body;

  if (!status) {
    return next(new AppError('Vui lòng điền trạng thái đơn hàng', 400));
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      orderStatus: status,
      paymentIntent: {
        status,
      },
    },
    { new: true }
  );

  res.status(200).json({
    status: 'Thành công',
    data: order,
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
