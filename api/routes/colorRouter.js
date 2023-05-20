const express = require('express');

const colorController = require('../controllers/colorController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();

// routes
router
  .route('/')
  .get(colorController.getAllColors)
  .post(isAuthenticated, restrictTo('admin'), colorController.createAColor);

router
  .route('/:id')
  .get(colorController.getAColor)
  .patch(isAuthenticated, restrictTo('admin'), colorController.updateAColor)
  .delete((isAuthenticated, restrictTo('admin'), colorController.deleteAColor));

module.exports = router;
