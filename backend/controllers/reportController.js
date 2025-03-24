import Complaint from '../models/complaintModel.js';
import { io } from '../server.js'; // Importing Socket.IO instance

// File a new complaint
export const fileReport = async (req, res) => {
  try {
    const { type, description, location, severity } = req.body;

    const report = await Report.create({
      type,
      description,
      location,
      severity,
      status: 'Pending',
    });

    // Emit the new complaint to connected police officers
    io.emit('reportUpdate', report);

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Error filing report' });
  }
};

// Get all complaints
export const getReports= async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reports' });
  }
};
