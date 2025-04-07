import express from 'express';
import { fileCase, getAllCases } from '../controllers/policeCaseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../utils/cloudinary.js'; // 

const router = express.Router();

// File a new police case with media upload support
router.post(
  '/fileCase',
  protect(['police']),
  upload.array('media', 10), // handles up to 10 files named 'media'
  fileCase
);

// Get all filed police cases
router.get(
  '/getCases',
  protect(['police', 'admin']),
  getAllCases
);

export default router;
