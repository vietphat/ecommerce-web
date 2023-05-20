const express = require('express');

const blogCategoryController = require('../controllers/blogCategoryController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();

// routes
router
  .route('/')
  .get(blogCategoryController.getAllBlogCategories)
  .post(
    isAuthenticated,
    restrictTo('admin'),
    blogCategoryController.createABlogCategory
  );

router
  .route('/:id')
  .get(blogCategoryController.getABlogCategory)
  .patch(
    isAuthenticated,
    restrictTo('admin'),
    blogCategoryController.updateABlogCategory
  )
  .delete(
    (isAuthenticated,
    restrictTo('admin'),
    blogCategoryController.deleteABlogCategory)
  );

module.exports = router;
