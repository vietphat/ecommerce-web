const express = require('express');

const couponController = require('../controllers/couponController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();

// routes
router.use(isAuthenticated, restrictTo('admin'));

router
  .route('/')
  .get(couponController.getAllCoupons)
  .post(couponController.createACoupon);

router
  .route('/:id')
  .get(couponController.getACoupon)
  .patch(couponController.updateACoupon)
  .delete(couponController.deleteACoupon);

module.exports = router;
