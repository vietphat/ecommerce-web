const express = require('express');

const brandController = require('../controllers/brandController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();

// routes
router
  .route('/')
  .get(brandController.getAllBrands)
  .post(isAuthenticated, restrictTo('admin'), brandController.createABrand);

router
  .route('/:id')
  .get(brandController.getABrand)
  .patch(isAuthenticated, restrictTo('admin'), brandController.updateABrand)
  .delete((isAuthenticated, restrictTo('admin'), brandController.deleteABrand));

module.exports = router;
