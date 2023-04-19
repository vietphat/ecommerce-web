const Blog = require('./../models/Blog');
const User = require('./../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const validateMongoDbId = require('./../config/validateMongoDbId');

exports.createABlog = catchAsync(async (req, res, next) => {
  const { title, description, category, image, author } = req.body;

  const blog = await Blog.create({
    title,
    description,
    category,
    image,
    author: req.user._id,
  });

  res.status(200).json({
    status: 'Thành công',
    data: blog,
  });
});

exports.updateABlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  const { title, description, category, image } = req.body;

  const blog = await Blog.findByIdAndUpdate(
    id,
    {
      title,
      description,
      category,
      image,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: 'Thành công',
    data: blog,
  });
});

exports.getABlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  if (!(await Blog.findById(id))) {
    return next(new AppError(`Không tìm thấy blog với id là ${id}`, 400));
  }

  const blog = await Blog.findByIdAndUpdate(
    id,
    {
      $inc: { numViews: 1 },
    },
    { new: true }
  ).populate([
    {
      path: 'likes',
      select: 'firstName lastName avatarUrl',
    },
    {
      path: 'dislikes',
      select: 'firstName lastName avatarUrl',
    },
  ]);

  res.status(200).json({
    status: 'Thành công',
    data: blog,
  });
});

exports.getAllBlog = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find().populate([
    {
      path: 'likes',
      select: 'firstName lastName avatarUrl',
    },
    {
      path: 'dislikes',
      select: 'firstName lastName avatarUrl',
    },
  ]);

  if (!blogs) {
    return next(new AppError(`Không tìm thấy blogs`, 400));
  }

  res.status(200).json({
    status: 'Thành công',
    length: blogs.length,
    data: blogs,
  });
});

exports.likeABlog = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;

  if (!validateMongoDbId(blogId)) {
    return next(new AppError('Blog id không hợp lệ', 400));
  }

  let blog = await Blog.findById(blogId);

  if (!blog) {
    return next(new AppError('Blog không tồn tại', 400));
  }

  const currentUserHasAlreadyLikeThisBlog = blog.likes.includes(req.user._id);
  const currentUserHasAlreadyDislikeThisBlogIndex = blog.dislikes.findIndex(
    (dislikeUserId) => dislikeUserId.toString() === req.user._id.toString()
  );

  // nếu chưa thích blog này
  if (!currentUserHasAlreadyLikeThisBlog) {
    // nếu đã dislike blog này
    if (currentUserHasAlreadyDislikeThisBlogIndex !== -1) {
      blog.dislikes.splice(currentUserHasAlreadyDislikeThisBlogIndex, 1);
    }

    blog.likes.push(req.user._id);

    await blog.save();

    res.status(200).json({
      status: 'Thành công',
      data: blog,
    });
  } else {
    return next(new AppError('Bạn đã like bài đăng này rồi', 400));
  }
});

exports.dislikeABlog = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;

  if (!validateMongoDbId(blogId)) {
    return next(new AppError('Blog id không hợp lệ', 400));
  }

  let blog = await Blog.findById(blogId);

  if (!blog) {
    return next(new AppError('Blog không tồn tại', 400));
  }

  const currentUserHasAlreadyDislikeThisBlog = blog.dislikes.includes(
    req.user._id
  );
  const currentUserHasAlreadyLikeThisBlogIndex = blog.likes.findIndex(
    (likeUserId) => likeUserId.toString() === req.user._id.toString()
  );

  // nếu chưa dislike thích blog này
  if (!currentUserHasAlreadyDislikeThisBlog) {
    // nếu đã like blog này
    if (currentUserHasAlreadyLikeThisBlogIndex !== -1) {
      blog.likes.splice(currentUserHasAlreadyLikeThisBlogIndex, 1);
    }

    blog.dislikes.push(req.user._id);

    await blog.save();

    res.status(200).json({
      status: 'Thành công',
      data: blog,
    });
  } else {
    return next(new AppError('Bạn đã dislike bài đăng này rồi', 400));
  }
});
