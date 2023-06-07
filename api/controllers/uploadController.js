const fs = require('fs');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const {
  cloudinaryUploadImg,
  cloudinaryDestroyImg,
} = require('./../utils/cloudinary');

exports.uploadImages = catchAsync(async (req, res, next) => {
  if (!req?.files) {
    return next(new AppError('Không nhận được files', 400));
  }

  const urls = [];
  const { files } = req;

  for (const file of files) {
    const { path } = file;
    const result = await cloudinaryUploadImg(path);
    urls.push(result);
    fs.unlinkSync(path);
  }

  const images = urls.map((url) => url);

  res.status(200).json({
    status: 'Thành công',
    data: images,
  });
});

exports.deleteImages = catchAsync(async (req, res, next) => {
  const { publicId } = req.params;
  await cloudinaryDestroyImg(publicId);

  res.status(200).json({
    status: 'Thành công',
    publicId,
  });
});
