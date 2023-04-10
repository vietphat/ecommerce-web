const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

// load các biến môi trường từ .env vào process.env
dotenv.config();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} !!!`);
});
