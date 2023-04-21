const express = require('express');

const authController = require('../controllers/authController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Login
router.post('/admin-login', authController.adminLogin);

// Login with google account
router.post(
  '/login-with-google-account',
  authController.signinWithGoogleAccount
);

// Handle refresh token
router.put('/refresh-token', authController.handleRefreshToken);

// Logout
router.get('/logout', authController.logout);

// Forgot password
router.post('/forgot-password', authController.forgotPassword);

// Reset password
router.patch(
  '/reset-password/:resetPasswordToken',
  authController.resetPassword
);

// Change my password
router.patch(
  '/change-password',
  isAuthenticated,
  authController.changeMyPassword
);

module.exports = router;
