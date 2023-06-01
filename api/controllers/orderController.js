const Order = require('../models/Order');
const catchAsync = require('../utils/catchAsync');

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find()
    .populate('products.product', 'title price')
    .populate('orderBy');

  res.status(200).json({
    status: 'Thành công',
    length: orders.length,
    data: orders,
  });
});
