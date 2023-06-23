const Order = require('../models/Order');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');

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

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    ).populate('user');

    const url = `${process.env.DEV_CLIENT_DOMAIN}/orders`;

    await new Email(
      { email: order.user.email, firstName: order.user.firstName },
      url
    ).sendOrderStatusChange();

    res.status(200).json({
      status: 'Thành công',
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Thất bại',
      data: null,
      error,
    });
  }
});
