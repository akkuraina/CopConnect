import express from 'express';
import { fileReport, getReports } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to file a report (Only Citizens can file reports)
router.post('/fileReport', protect(['citizen']), fileReport);

// Route to get all reports (Only Admins & Police can access)
router.get('/getReports', protect(['police', 'admin']), getReports);

export default router;
