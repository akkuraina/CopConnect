import express from 'express';
import { fileComplaint, getComplaints } from '../controllers/reportController.js';

const router = express.Router();

// Route to file a complaint
router.post('/file', fileComplaint);

// Route to get all complaints (for police dashboard)
router.get('/all', getComplaints);

export default router;
