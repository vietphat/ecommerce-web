const express = require('express');

const userController = require('./../controllers/userController');
const isAuthenticated = require('./../middlewares/isAuthenticated');
const restrictTo = require('./../middlewares/restrictTo');

const router = express.Router();

/// Toàn bộ route này cần đăng nhập để sử dụng
router.use(isAuthenticated);

// Cập nhật thông tin cá nhân
router.patch('/update-my-data', userController.updateMyData);

// Xóa tài khoản cá nhân
router.delete('/delete-me', userController.deleteMe);

/// Các route sau cần quyền truy cập là admin
router.use(restrictTo('admin'));

router
  .route('/')
  // Lấy tất cả người dùng
  .get(userController.getAllUsers)
  // Tạo người dùng
  .post(userController.createAUser);

// Tìm người dùng dựa vào tên hoặc email
router.get('/search/:searchInput', userController.getUsersByNameOrEmail);

router
  .route('/:id')
  // Lấy 1 người dùng
  .get(userController.getAUser)
  // Cập nhật 1 người dùng
  .patch(userController.updateAUser)
  // Xóa 1 người dùng
  .delete(userController.deleteAUser);

module.exports = router;
