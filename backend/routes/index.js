const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const blogRouter = require('./blogRouter');

const router = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/product', productRouter);
  app.use('/api/blog', blogRouter);
};

module.exports = router;
