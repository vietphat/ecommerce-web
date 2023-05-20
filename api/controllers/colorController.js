const Color = require('../models/Color');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const validateMongoDbId = require('../config/validateMongoDbId');

exports.getAllColors = catchAsync(async (req, res, next) => {
  const colors = await Color.find();

  res.status(200).json({
    status: 'Thành công',
    length: colors?.length,
    data: colors,
  });
});

exports.getAColor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const color = await Color.findById(id);

  if (!color) {
    return next(new AppError(`Không tìm thấy thương hiệu với id là ${id}`));
  }

  res.status(200).json({
    status: 'Thành công',
    data: color,
  });
});

exports.createAColor = catchAsync(async (req, res, next) => {
  const { title } = req.body;

  const color = await Color.create({ title });

  res.status(200).json({
    status: 'Thành công',
    data: color,
  });
});

exports.updateAColor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const { title } = req.body;

  const color = await Color.findByIdAndUpdate(id, { title }, { new: true });

  res.status(200).json({
    status: 'Thành công',
    data: color,
  });
});

exports.deleteAColor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  await Color.findByIdAndDelete(id);

  res.status(200).json({
    status: 'Thành công',
    data: null,
  });
});
