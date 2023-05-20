const express = require('express');

const productCategoryController = require('../controllers/productCategoryController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();

// routes
router
  .route('/')
  .get(productCategoryController.getAllProductCategories)
  .post(
    isAuthenticated,
    restrictTo('admin'),
    productCategoryController.createAProductCategory
  );

router
  .route('/:id')
  .get(productCategoryController.getAProductCategory)
  .patch(
    isAuthenticated,
    restrictTo('admin'),
    productCategoryController.updateAProductCategory
  )
  .delete(
    (isAuthenticated,
    restrictTo('admin'),
    productCategoryController.deleteAProductCategory)
  );

module.exports = router;
