const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: 'Chưa xử lý',
      enum: [
        'Chưa xử lý',
        'COD',
        'Đang xử lý',
        'Đã xuất kho',
        'Đã nhận hàng',
        'Đã hủy đơn hàng',
      ],
    },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
