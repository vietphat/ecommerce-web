const express = require('express');

const authController = require('../controllers/authController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Login with google account
router.post(
  '/login-with-google-account',
  authController.signinWithGoogleAccount
);

// Logout
router.get('/logout', authController.logout);

// Change password
router.patch(
  '/change-password',
  isAuthenticated,
  authController.changePassword
);

// Forgot password
router.post('/forgot-password', authController.forgotPassword);

// Reset password
router.patch(
  '/reset-password/:resetPasswordToken',
  authController.resetPassword
);

module.exports = router;
