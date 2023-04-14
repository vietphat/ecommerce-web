const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

const router = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
};

module.exports = router;
