const express = require('express');

const productController = require('./../controllers/productController');
const isAuthenticated = require('./../middlewares/isAuthenticated');
const restrictTo = require('./../middlewares/restrictTo');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(isAuthenticated, restrictTo('admin'), productController.createAProduct);

// Thêm vào ds yêu thích
router.patch('/wishlist/:id', isAuthenticated, productController.addToWishList);

router
  .route('/:id')
  .get(productController.getAProduct)
  .patch(isAuthenticated, restrictTo('admin'), productController.updateAProduct)
  .delete(
    isAuthenticated,
    restrictTo('admin'),
    productController.deleteAProduct
  );

module.exports = router;
