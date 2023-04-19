const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');

const router = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/product', productRouter);
};

module.exports = router;
