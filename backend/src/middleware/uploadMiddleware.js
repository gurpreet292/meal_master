import multer from 'multer';
import path from 'path';

// temporary storage before uploading to cloudinary
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Note: ensure 'uploads/' directory exists in backend or use OS temperary directory
    cb(null, '/tmp/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.webp') {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  }
});

export default upload;
