const BlogCategory = require('../models/BlogCategory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const validateMongoDbId = require('../config/validateMongoDbId');

exports.getAllBlogCategories = catchAsync(async (req, res, next) => {
  const blogCategories = await BlogCategory.find();

  res.status(200).json({
    status: 'Thành công',
    length: blogCategories.length,
    data: blogCategories,
  });
});

exports.getABlogCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const blogCategory = await BlogCategory.findById(id);

  if (!blogCategory) {
    return next(new AppError(`Không tìm thấy loại bài viết với id là ${id}`));
  }

  res.status(200).json({
    status: 'Thành công',
    data: blogCategory,
  });
});

exports.createABlogCategory = catchAsync(async (req, res, next) => {
  const { title } = req.body;

  const blogCategory = await BlogCategory.create({ title });

  res.status(200).json({
    status: 'Thành công',
    data: blogCategory,
  });
});

exports.updateABlogCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const { title } = req.body;

  const blogCategory = await BlogCategory.findByIdAndUpdate(
    id,
    { title },
    { new: true }
  );

  res.status(200).json({
    status: 'Thành công',
    data: blogCategory,
  });
});

exports.deleteABlogCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  await BlogCategory.findByIdAndDelete(id);

  res.status(200).json({
    status: 'Thành công',
    data: null,
  });
});
