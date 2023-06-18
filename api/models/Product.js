const mongoose = require('mongoose'); // Erase if already required

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    colors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
        required: true,
      },
    ],
    tag: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    ratings: [
      {
        star: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String },
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre(/^find/, function () {
  this.populate('brand')
    .populate('category')
    .populate('colors')
    .populate('ratings.postedBy'); // Populate thông tin brand
});

module.exports = mongoose.model('Product', productSchema);
