const cloudinary = require('cloudinary').v2;

const cloudinaryUploadImg = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.uploader.upload(filePath);
    return {
      url: result.secure_url,
      asset_id: result.asset_id,
      public_id: result.public_id,
    };
  } catch (err) {
    console.log('cloudinary error', err);
  }
};

const cloudinaryDestroyImg = async (publicId) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('destroy file', result);
    return true;
  } catch (err) {
    console.log('cloudinary error', err);
    return false;
  }
};

module.exports = { cloudinaryUploadImg, cloudinaryDestroyImg };
