const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shippingInfo: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      notes: {
        type: String,
      },
    },
    paymentMethod: {
      type: String,
      enum: ['online', 'cod'],
      default: 'cod',
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        color: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Color',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    totalPriceAfterDiscount: {
      type: Number,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    orderStatus: {
      type: String,
      default: 'ordered',
      enum: [
        'ordered',
        'approved',
        'processing',
        'shipped',
        'completed',
        'canceled',
        'returned',
      ],
    },
    month: {
      type: String,
      default: new Date().getMonth(),
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre(/^find/, function () {
  this.populate('orderItems.product orderItems.color');
});

module.exports = mongoose.model('Order', orderSchema);
