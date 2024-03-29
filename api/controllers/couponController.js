const Coupon = require('./../models/Coupon');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const validateMongoDbId = require('./../config/validateMongoDbId');

exports.getAllCoupons = catchAsync(async (req, res, next) => {
  const coupons = await Coupon.find();

  res.status(200).json({
    status: 'Thành công',
    length: coupons.length,
    data: coupons,
  });
});

exports.getACoupon = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const coupon = await Coupon.findById(id);

  if (!coupon) {
    return next(new AppError(`Không tìm thấy phiếu giảm giá với id là ${id}`));
  }

  res.status(200).json({
    status: 'Thành công',
    data: coupon,
  });
});

exports.createACoupon = catchAsync(async (req, res, next) => {
  const { name, expiry, discount } = req.body;

  const coupon = await Coupon.create({ name, expiry, discount });

  res.status(200).json({
    status: 'Thành công',
    data: coupon,
  });
});

exports.updateACoupon = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const { name, expiry, discount } = req.body;

  const coupon = await Coupon.findByIdAndUpdate(
    id,
    { name, expiry, discount },
    { new: true }
  );

  res.status(200).json({
    status: 'Thành công',
    data: coupon,
  });
});

exports.deleteACoupon = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  await Coupon.findByIdAndDelete(id);

  res.status(200).json({
    status: 'Thành công',
    data: null,
  });
});

exports.applyCoupon = catchAsync(async (req, res, next) => {
  // lấy mã giảm giá và giá hiện tại
  const { couponCode, price } = req.body;

  // check mã giảm giá hợp lệ
  const coupon = await Coupon.findOne({ name: couponCode.toUpperCase() });

  if (coupon === null) {
    return next(new AppError('Mã giảm giá không hợp lệ!', 400));
  }

  // tính toán giá sau giảm
  const reducedPrice = (coupon.discount / 100) * price;

  res.status(200).json({
    status: 'Thành công',
    data: {
      coupon,
      reducedPrice,
    },
  });
});
