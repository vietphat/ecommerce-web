const cloudinary = require('cloudinary').v2;

const cloudinaryUploadImg = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url;
  } catch (err) {
    console.log('cloudinary error', err);
  }
};

module.exports = cloudinaryUploadImg;
