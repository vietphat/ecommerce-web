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

// Cập nhật số lượng
router.patch('/cart/:id', userController.updateCartQuantity);

// Xóa giỏ hàng
router.delete('/cart/:id', userController.emptyUserCart);

/// ĐẶT HÀNG
// Tạo đơn đặt hàng
router.post('/order', userController.createOrder);

// Xóa giỏ hàng sau khi đặt hàng
router.post('/cart/order', userController.deleteCartsAfterOrder);

// Lấy thông tin các đơn đặt hàng
router.get('/my-orders', userController.getMyOrders);

/// CÁC ROUTE SAU CẦN QUYỀN TRUY CẬP ADMIN
router.use(restrictTo('admin'));

router
  .route('/')
  // Lấy tất cả người dùng
  .get(userController.getAllUsers)
  // Tạo người dùng
  .post(userController.createAUser);

// Lấy thông tin thu nhập 12 tháng qua
router.get('/monthly-income-report', userController.getMonthlyIncomeReport);

// Lấy thông tin thu nhập 12 tháng qua
router.get('/yearly-income-report', userController.getYearlyIncomeReport);

// Lấy thông tin tất cả khách hàng
router.get('/customers', userController.getAllCustomers);

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
