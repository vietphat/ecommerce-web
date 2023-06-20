const Order = require('../models/Order');
const catchAsync = require('../utils/catchAsync');

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find().populate('user');

  res.status(200).json({
    status: 'Thành công',
    length: orders.length,
    data: orders,
  });
});

exports.getOrdersById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate('user');

  res.status(200).json({
    status: 'Thành công',
    data: order,
  });
});

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  const order = await Order.findByIdAndUpdate(
    id,
    { orderStatus },
    { new: true }
  ).populate('user');

  res.status(200).json({
    status: 'Thành công',
    data: order,
  });
});
