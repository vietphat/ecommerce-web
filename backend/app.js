const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const routes = require('./routes');
const errorController = require('./controllers/errorController');
const AppError = require('./utils/AppError');

const app = express();

app.use(express.json());
app.use(cookieParser);
app.use(morgan('common'));

routes(app);

app.all('*', (req, res, next) => {
  next(new AppError(`Không tìm thấy đường dẫn ${req.originalUrl}`, 404));
});

app.use(errorController.globalErrorHandler);

module.exports = app;
