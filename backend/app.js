const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

module.exports = app;
