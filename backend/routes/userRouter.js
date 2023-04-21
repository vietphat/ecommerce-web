const express = require('express');

const userController = require('./../controllers/userController');
const isAuthenticated = require('./../middlewares/isAuthenticated');
const restrictTo = require('./../middlewares/restrictTo');

const router = express.Router();

/// MIDDLEWARE CHECK XÁC THỰC NGƯỜI DÙNG
router.use(isAuthenticated);

// Cập nhật thông tin cá nhân
router.patch('/update-my-data', userController.updateMyData);

// Cập nhật thông tin địa chỉ
router.patch('/save-address', userController.saveAddress);

// Xóa tài khoản cá nhân
router.delete('/delete-me', userController.deleteMe);

// Lấy danh sách yêu thích (wishlist)
router.get('/wishlist', userController.getWishlist);

/// GIỎ HÀNG
// Thêm giỏ hàng
router.post('/cart', userController.addToCart);

// Lấy thông tin giỏ hàng
router.get('/cart', userController.getUserCart);

// Lấy thông tin giỏ hàng
router.delete('/cart', userController.emptyUserCart);

// Sử dụng phiếu giảm giá
router.patch('/cart/apply-coupon', userController.applyCoupon);

/// HÓA ĐƠN
// Tạo hóa đơn
router.post('/order', userController.createOrder);

// Lấy thông tin hóa đơn
router.get('/order', userController.getOrders);

// Cập nhật thông tin hóa đơn
router.patch(
  '/order/:id',
  restrictTo('admin'),
  userController.updateOrderStatus
);

/// CÁC ROUTE SAU CẦN QUYỀN TRUY CẬP ADMIN
router.use(restrictTo('admin'));

router
  .route('/')
  // Lấy tất cả người dùng
  .get(userController.getAllUsers)
  // Tạo người dùng
  .post(userController.createAUser);

// Tìm người dùng dựa vào tên hoặc email
router.get('/search/:searchInput', userController.getUsersByNameOrEmail);

// Block/unblock người dùng
router.patch('/block/:id', userController.blockAUser);
router.patch('/unblock/:id', userController.unblockAUser);

router
  .route('/:id')
  // Lấy 1 người dùng
  .get(userController.getAUser)
  // Cập nhật 1 người dùng
  .patch(userController.updateAUser)
  // Xóa 1 người dùng
  .delete(userController.deleteAUser);

module.exports = router;
