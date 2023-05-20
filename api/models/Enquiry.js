const mongoose = require('mongoose');

var enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Đã gửi',
    enum: ['Đã gửi', 'Đã phản hồi', 'Đang xử lý'],
  },
});

module.exports = mongoose.model('Enquiry', enquirySchema);
