import express from 'express';
import { fileReport, getReports } from '../controllers/reportController.js';

const router = express.Router();

// Route to file a complaint
router.post('/file', fileReport);

// Route to get all complaints (for police dashboard)
router.get('/all', getReports);

export default router;
