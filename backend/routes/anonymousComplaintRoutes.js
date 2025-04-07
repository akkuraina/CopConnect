import express from 'express';
import { submitComplaint, getAllComplaints } from '../controllers/anonymousComplaintController.js';

const router = express.Router();

router.post('/submit', submitComplaint);
router.get('/all', getAllComplaints);

export default router;
