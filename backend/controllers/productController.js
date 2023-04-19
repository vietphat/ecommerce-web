const slugify = require('slugify');

const Product = require('./../models/Product');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const validateMongoDbId = require('./../config/validateMongoDbId');
const APIFeatures = require('./../utils/APIFeatures');

exports.createAProduct = catchAsync(async (req, res, next) => {
  const { title, description, price, quantity, color, brand, category } =
    req.body;

  const slug = slugify(title);

  const product = await Product.create({
    title,
    slug,
    description,
    price,
    quantity,
    color,
    brand,
    category,
  });

  res.status(200).json({
    status: 'Thành công',
    data: product,
  });
});

exports.getAProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const product = await Product.findById(id);

  if (!product) {
    return next(new AppError(`Không tìm thấy sản phẩm với id là ${id}`, 400));
  }

  res.status(200).json({
    status: 'Thành công',
    data: product,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  res.status(200).json({
    status: 'Thành công',
    length: products.length,
    data: products,
  });
});

exports.updateAProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const { title, description, price, quantity, color, brand, category } =
    req.body;

  const slug = slugify(title);

  const product = await Product.findByIdAndUpdate(
    id,
    {
      title,
      slug,
      description,
      price,
      quantity,
      color,
      brand,
      category,
    },
    { new: true }
  );

  res.status(200).json({
    status: 'Thành công',
    data: product,
  });
});

exports.deleteAProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  await Product.findByIdAndDelete(id);

  res.status(200).json({
    status: 'Thành công',
    data: null,
  });
});
