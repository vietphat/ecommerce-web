const fs = require('fs');

const Blog = require('./../models/Blog');
const AppError = require('../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const validateMongoDbId = require('./../config/validateMongoDbId');
const { cloudinaryUploadImg } = require('../utils/cloudinary');

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

exports.deleteABlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Id không hợp lệ', 400));
  }

  await Blog.findByIdAndDelete(id);

  res.status(200).json({
    status: 'Thành công',
    data: null,
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

  const currentUserHasAlreadyLikeThisBlogIndex = blog.likes.findIndex(
    (likeUserId) => likeUserId.toString() === req.user._id.toString()
  );
  const currentUserHasAlreadyDislikeThisBlogIndex = blog.dislikes.findIndex(
    (dislikeUserId) => dislikeUserId.toString() === req.user._id.toString()
  );

  // nếu chưa thích blog này
  if (currentUserHasAlreadyLikeThisBlogIndex === -1) {
    // nếu đã dislike blog này => bỏ dislike
    if (currentUserHasAlreadyDislikeThisBlogIndex !== -1) {
      blog.dislikes.splice(currentUserHasAlreadyDislikeThisBlogIndex, 1);
    }

    // like
    blog.likes.push(req.user._id);
  } else {
    // nếu đã thích rồi => bỏ thích
    blog.likes.splice(currentUserHasAlreadyLikeThisBlogIndex, 1);
  }

  await blog.save();

  res.status(200).json({
    status: 'Thành công',
    data: blog,
  });
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

  const currentUserHasAlreadyDislikeThisBlogIndex = blog.dislikes.findIndex(
    (dislikeUserId) => dislikeUserId.toString() === req.user._id.toString()
  );
  const currentUserHasAlreadyLikeThisBlogIndex = blog.likes.findIndex(
    (likeUserId) => likeUserId.toString() === req.user._id.toString()
  );

  // nếu chưa dislike thích blog này
  if (currentUserHasAlreadyDislikeThisBlogIndex === -1) {
    // nếu đã like blog này
    if (currentUserHasAlreadyLikeThisBlogIndex !== -1) {
      blog.likes.splice(currentUserHasAlreadyLikeThisBlogIndex, 1);
    }

    blog.dislikes.push(req.user._id);
  } else {
    // nếu đã dislike rồi => bỏ dislike
    blog.dislikes.splice(currentUserHasAlreadyDislikeThisBlogIndex, 1);
  }

  await blog.save();

  res.status(200).json({
    status: 'Thành công',
    data: blog,
  });
});

exports.uploadImages = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!validateMongoDbId(id)) {
    return next(new AppError('Blog id không hợp lệ', 400));
  }

  if (!req?.files) {
    return next(new AppError('Không nhận được files', 400));
  }

  const urls = [];
  const { files } = req;

  for (const file of files) {
    const { path } = file;
    const newPath = await cloudinaryUploadImg(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }

  const blog = await Blog.findByIdAndUpdate(
    id,
    {
      images: urls.map((url) => url),
    },
    {
      new: true,
    }
  );

  if (!blog) {
    return next(new AppError(`Không tìm thấy blog với id là ${id}`, 400));
  }

  res.status(200).json({
    status: 'Thành công',
    data: blog,
  });
});
