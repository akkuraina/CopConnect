import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'police_cases',
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4'],
    resource_type: 'auto',
  },
});

// Multer middleware using cloudinary storage
const upload = multer({ storage });

export { cloudinary, upload };
