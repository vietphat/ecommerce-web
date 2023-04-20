const ProductCategory = require('./../models/ProductCategory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const validateMongoDbId = require('./../config/validateMongoDbId');

exports.getAllProductCategories = catchAsync(async (req, res, next) => {
  const productCategories = await ProductCategory.find();

  res.status(200).json({
    status: 'Thành công',
    length: productCategories.length,
    data: productCategories,
  });
});

exports.getAProductCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const productCategory = await ProductCategory.findById(id);

  if (!productCategory) {
    return next(new AppError(`Không tìm thấy loại sản phẩm với id là ${id}`));
  }

  res.status(200).json({
    status: 'Thành công',
    data: productCategory,
  });
});

exports.createAProductCategory = catchAsync(async (req, res, next) => {
  const { title } = req.body;

  const productCategory = await ProductCategory.create({ title });

  res.status(200).json({
    status: 'Thành công',
    data: productCategory,
  });
});

exports.updateAProductCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const { title } = req.body;

  const productCategory = await ProductCategory.findByIdAndUpdate(
    id,
    { title },
    { new: true }
  );

  res.status(200).json({
    status: 'Thành công',
    data: productCategory,
  });
});

exports.deleteAProductCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  await ProductCategory.findByIdAndDelete(id);

  res.status(200).json({
    status: 'Thành công',
    data: null,
  });
});
