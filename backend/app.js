const express = require('express');
const morgan = require('morgan');

const routes = require('./routes');
const errorController = require('./controllers/errorController');

const app = express();

app.use(express.json());
app.use(morgan('common'));

routes(app);

app.all('*', (req, res, next) => {
  next(new AppError(`Không tìm thấy đường dẫn ${req.originalUrl}`, 404));
});

app.use(errorController.globalErrorHandler);

module.exports = app;
