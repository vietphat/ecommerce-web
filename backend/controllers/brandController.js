const Brand = require('../models/Brand');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const validateMongoDbId = require('../config/validateMongoDbId');

exports.getAllBrands = catchAsync(async (req, res, next) => {
  const brands = await Brand.find();

  res.status(200).json({
    status: 'Thành công',
    length: brands.length,
    data: brands,
  });
});

exports.getABrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const brand = await Brand.findById(id);

  if (!brand) {
    return next(new AppError(`Không tìm thấy thương hiệu với id là ${id}`));
  }

  res.status(200).json({
    status: 'Thành công',
    data: brand,
  });
});

exports.createABrand = catchAsync(async (req, res, next) => {
  const { title } = req.body;

  const brand = await Brand.create({ title });

  res.status(200).json({
    status: 'Thành công',
    data: brand,
  });
});

exports.updateABrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const { title } = req.body;

  const brand = await Brand.findByIdAndUpdate(id, { title }, { new: true });

  res.status(200).json({
    status: 'Thành công',
    data: brand,
  });
});

exports.deleteABrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  await Brand.findByIdAndDelete(id);

  res.status(200).json({
    status: 'Thành công',
    data: null,
  });
});
