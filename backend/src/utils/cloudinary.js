import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (path) => {
  return await cloudinary.v2.uploader.upload(path, { folder: 'meal-master' });
};

export default cloudinary.v2;
 