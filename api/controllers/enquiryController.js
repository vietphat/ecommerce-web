const Enquiry = require('../models/Enquiry');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const validateMongoDbId = require('../config/validateMongoDbId');
const Email = require('../utils/email');

exports.getAllEnquiries = catchAsync(async (req, res, next) => {
  const enquiries = await Enquiry.find();

  res.status(200).json({
    status: 'Thành công',
    length: enquiries.length,
    data: enquiries,
  });
});

exports.getAnEnquiry = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const enquiry = await Enquiry.findById(id);

  if (!enquiry) {
    return next(
      new AppError(`Không tìm thấy thắc mắc của người dùng với id là ${id}`)
    );
  }

  res.status(200).json({
    status: 'Thành công',
    data: enquiry,
  });
});

exports.createAnEnquiry = catchAsync(async (req, res, next) => {
  const { name, email, mobile, comment, status } = req.body;

  const enquiry = await Enquiry.create({
    name,
    email,
    mobile,
    comment,
    status,
  });

  await new Email({ firstName: name, email }).sendFeedbackWhenReceivedEnquiry();

  res.status(200).json({
    status: 'Thành công',
    data: enquiry,
  });
});

exports.updateAnEnquiry = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const { name, email, mobile, comment, status } = req.body;

  const enquiry = await Enquiry.findByIdAndUpdate(
    id,
    { name, email, mobile, comment, status },
    { new: true }
  );

  res.status(200).json({
    status: 'Thành công',
    data: enquiry,
  });
});

exports.deleteAnEnquiry = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  await Enquiry.findByIdAndDelete(id);

  res.status(200).json({
    status: 'Thành công',
    data: null,
  });
});
