const slugify = require('slugify');

const Product = require('./../models/Product');
const User = require('../models/User');
const AppError = require('./../utils/AppError');
const APIFeatures = require('./../utils/APIFeatures');
const catchAsync = require('./../utils/catchAsync');
const validateMongoDbId = require('./../config/validateMongoDbId');

exports.createAProduct = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    price,
    quantity,
    colors,
    brand,
    category,
    images,
    tag,
  } = req.body;

  const slug = slugify(title);

  const product = await Product.create({
    title,
    slug,
    description,
    price,
    quantity,
    colors,
    brand,
    category,
    images,
    tag,
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

  const {
    title,
    description,
    price,
    quantity,
    colors,
    brand,
    category,
    images,
    tag,
  } = req.body;

  const slug = slugify(title);

  const product = await Product.findByIdAndUpdate(
    id,
    {
      title,
      description,
      price,
      quantity,
      colors,
      brand,
      category,
      images,
      tag,
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

exports.addToWishList = catchAsync(async (req, res, next) => {
  const { id: productId } = req.params;

  if (!validateMongoDbId(productId)) {
    return next(new AppError('Product Id không hợp lệ', 400));
  }

  const user = await User.findById(req.user._id);
  const product = await Product.findById(productId);

  if (!product) {
    return next(
      new AppError(`Không tìm thấy sản phẩm có id là ${productId}`, 400)
    );
  }

  const alreadyAddedIndex = user.wishlist.findIndex(
    (pId) => pId.toString() === productId
  );

  // nếu người dùng chưa thêm vào danh sách yêu thích
  // => thêm vào ds
  if (alreadyAddedIndex === -1) {
    user.wishlist.push(productId);
  } else {
    user.wishlist.splice(alreadyAddedIndex, 1);
  }

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'Thành công',
    data: user,
  });
});

exports.ratingAProduct = catchAsync(async (req, res, next) => {
  const { id: productId } = req.params;
  const { _id: userId } = req.user;

  const { star, comment } = req.body;

  if (!validateMongoDbId(productId)) {
    return next(new AppError('Product id không hợp lệ', 400));
  }

  const product = await Product.findById(productId);

  if (!product) {
    return next(new AppError(`Không tìm thấy sản phẩm với id là ${productId}`));
  }

  const alreadyRatedIndex = product.ratings.findIndex(
    (ratingObj) => ratingObj.postedBy.toString() === userId.toString()
  );

  let updatedProduct;
  // nếu đã đánh giá rồi
  // => chỉ thay thế star
  if (alreadyRatedIndex !== -1) {
    product.ratings[alreadyRatedIndex].star = star;
    product.ratings[alreadyRatedIndex].comment = comment;

    // nếu chưa thì
    // => thay thế star và tăng ratingsQuantity
  } else {
    product.ratings.push({ star, comment, postedBy: userId });
    product.ratingsQuantity++;
  }

  // tính đánh giá trung bình
  product.ratingsAverage = Math.round(
    product.ratings.reduce((acc, cur) => acc + cur.star, 0) /
      product.ratings.length
  );

  await product.save();

  res.status(200).json({
    status: 'Thành công',
    data: product,
  });
});
