const express = require('express');

const orderController = require('../controllers/orderController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();

// routes
router.use(isAuthenticated, restrictTo('admin'));

router.route('/').get(orderController.getAllOrders);

router
  .route('/:id')
  .get(orderController.getOrdersById)
  .patch(orderController.updateOrderStatus);

// router
//   .route('/:id')
//   .get(enquiryController.getAnEnquiry)
//   .patch(
//     isAuthenticated,
//     restrictTo('admin'),
//     enquiryController.updateAnEnquiry
//   )
//   .delete(
//     (isAuthenticated, restrictTo('admin'), enquiryController.deleteAnEnquiry)
//   );

module.exports = router;
