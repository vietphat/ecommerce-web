const express = require('express');

const blogController = require('./../controllers/blogController');
const isAuthenticated = require('./../middlewares/isAuthenticated');
const restrictTo = require('./../middlewares/restrictTo');

const router = express.Router();

// routes
router
  .route('/')
  .get(blogController.getAllBlog)
  .post(isAuthenticated, restrictTo('admin'), blogController.createABlog);

// like/dislike bài blog
router.patch('/like/:blogId', isAuthenticated, blogController.likeABlog);
router.patch('/dislike/:blogId', isAuthenticated, blogController.dislikeABlog);

router
  .route('/:id')
  .get(blogController.getABlog)
  .patch(isAuthenticated, restrictTo('admin'), blogController.updateABlog);

module.exports = router;
