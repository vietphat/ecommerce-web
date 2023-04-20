const crypto = require('crypto');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    // các thông tin cá nhân
    firstName: {
      type: String,
      required: [true, 'Trường họ là bắt buộc'],
    },
    lastName: {
      type: String,
      required: [true, 'Trường tên là bắt buộc'],
    },
    phoneNumber: {
      type: String,
      default: '',
      unique: true,
    },
    fromGoogleAccount: {
      type: Boolean,
      default: false,
    },
    avatarUrl: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/social-media-web-1648d.appspot.com/o/users%2Favatars%2Fdefault-avatar.jpg?alt=media&token=fe149b52-bf43-4711-ad59-5b1745d6f0ef',
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    carts: {
      type: Array,
      default: [],
    },
    // các thông tin xác thực
    email: {
      type: String,
      required: [true, 'Trường email là bắt buộc'],
      unique: true,
      validate: [validator.isEmail, 'Email không hợp lệ'],
    },
    password: {
      type: String,
      required: [true, 'Trường mật khẩu là bắt buộc'],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Vui lòng xác nhận mật khẩu'],
      validate: {
        validator: function (confirmPassword) {
          return this.password === confirmPassword;
        },
        message: 'Mật khẩu xác nhận không chính xác',
      },
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    passwordChangedAt: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordTokenExpiresIn: {
      type: Date,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// PRE HOOK: Mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
  // Chỉ mã hóa mật khẩu khi cột password được thêm hoặc được thay đổi
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;

  next();
});

// PRE HOOK: Cập nhật cột passwordChangedAt(thời gian thay đổi mật khẩu)
// khi mật khẩu được thay đổi (loại trừ trường hợp đây là document mới)
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// // PRE HOOK: Không lấy tài khoản đã xóa
// userSchema.pre(/^find/, function (next) {
//   // Nếu là admin thì có thể lấy thông tin tất cả tài khoản đã xóa
//   if (this.getOptions().byAdmin) {
//     this.find();
//   } else {
//     this.find({ active: { $ne: false } });
//   }

//   next();
// });

// METHOD kiểm tra mật khẩu nhập vào có chính xác hay không
userSchema.methods.enteredPasswordIsCorrect = async (
  candicatePassword,
  userPassword
) => {
  return await bcrypt.compare(candicatePassword, userPassword);
};

// METHOD kiểm tra xem ngày thay đổi mật khẩu là trước hay sau ngày tạo jwt
// false: trước hoặc chưa đổi mật khẩu lần nào
// true: thay đổi mật khẩu sau khi token được tạo
userSchema.methods.passwordChangedAfter = function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    const passwordChangedAt = new Date(this.passwordChangedAt).getTime() / 1000;
    return passwordChangedAt > tokenIssuedAt;
  }

  return false;
};

// METHOD dùng để tạo token cho phép người dùng sử dụng để thay đổi mật khẩu khi quên
userSchema.methods.createResetPasswordToken = function () {
  // Tạo reset password token bằng module crypto của nodejs
  const resetPasswordToken = crypto.randomBytes(32).toString('hex');

  // Hash và Lưu reset password token và thời hạn của token đó vào database
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetPasswordToken)
    .digest('hex');

  // token sẽ chỉ có hiệu lực trong 10 phút
  this.resetPasswordTokenExpiresIn = Date.now() + 10 * 60 * 1000;

  return resetPasswordToken;
};

//Export the model
module.exports = mongoose.model('User', userSchema);
