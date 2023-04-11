const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

// load các biến môi trường từ .env vào process.env
dotenv.config();

// Kết nối database
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log('Database connected successfully'));

// Chạy server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// xử lý các lỗi
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTIONS 💥, Shutting down...');
  console.log(`Error name: `, err.name);
  console.log(`Error message: `, err.message);
  console.log(`Error stack: `, err.stack);

  server.close(() => {
    process.exit(1);
  });
});
