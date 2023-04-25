const express = require('express');

const enquiryController = require('../controllers/enquiryController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();

// routes
router
  .route('/')
  .get(enquiryController.getAllEnquiries)
  .post(
    isAuthenticated,
    restrictTo('admin'),
    enquiryController.createAnEnquiry
  );

router
  .route('/:id')
  .get(enquiryController.getAnEnquiry)
  .patch(
    isAuthenticated,
    restrictTo('admin'),
    enquiryController.updateAnEnquiry
  )
  .delete(
    (isAuthenticated, restrictTo('admin'), enquiryController.deleteAnEnquiry)
  );

module.exports = router;
