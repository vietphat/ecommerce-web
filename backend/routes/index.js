const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const blogRouter = require('./blogRouter');
const productCategoryRouter = require('./productCategoryRouter');
const blogCategoryRouter = require('./blogCategoryRouter');
const brandRouter = require('./brandRouter');
const couponRouter = require('./couponRouter');

const router = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/products', productRouter);
  app.use('/api/blogs', blogRouter);
  app.use('/api/product-categories', productCategoryRouter);
  app.use('/api/blog-categories', blogCategoryRouter);
  app.use('/api/brands', brandRouter);
  app.use('/api/coupons', couponRouter);
};

module.exports = router;
