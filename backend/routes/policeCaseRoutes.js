import express from 'express';
import { fileCase, getAllCases } from '../controllers/policeCaseController.js';
import { protect } from '../middleware/authMiddleware.js';
import cloudinary from '../utils/cloudinary.js';
import parser from '../middleware/multer.js';



const router = express.Router();

// File a new police case with media upload support
// router.post(
//   '/fileCase',
//   protect(['police']),
//   upload.array('media', 10), // handles up to 10 files named 'media'
//   fileCase
// );
// router.post('/fileCase', parser.single('evidence'), fileCase);

router.post(
  "/fileCase",
  protect(['police']),               // if you're protecting the route
  parser.array("media", 5),  // Multer handles up to 5 files from "media" field
  fileCase                   // then controller handles logic
);

// Get all filed police cases
router.get(
  '/getCases',
  protect(['police', 'admin']),
  getAllCases
);

export default router;
