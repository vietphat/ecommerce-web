const express = require('express');

const uploadController = require('./../controllers/uploadController');
const isAuthenticated = require('./../middlewares/isAuthenticated');
const restrictTo = require('./../middlewares/restrictTo');
const {
  uploadPhoto,
  productImgResize,
} = require('./../middlewares/uploadImages');

const router = express.Router();

// Upload hình sản phẩm
router.post(
  '/',
  isAuthenticated,
  restrictTo('admin'),
  uploadPhoto.array('images', 10),
  productImgResize,
  uploadController.uploadImages
);

// Delete hình sản phẩm
router.delete(
  '/:publicId',
  isAuthenticated,
  restrictTo('admin'),
  uploadController.deleteImages
);

module.exports = router;
