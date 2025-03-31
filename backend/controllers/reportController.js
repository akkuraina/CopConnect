import Complaint from '../models/complaintModel.js';
import { io } from '../server.js';

export const fileReport = async (req, res) => {
  try {
    const { type, description, location, severity } = req.body;

    const report = await Complaint.create({
      type,
      description,
      location,
      severity,
      status: 'Pending',
    });

    io.emit('reportUpdate', report);

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Error filing report' });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Complaint.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reports' });
  }
};
