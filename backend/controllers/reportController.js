import Report from '../models/fileReport.js';
import { io } from '../server.js'; // Importing Socket.IO instance

// File a new complaint
export const fileReport = async (req, res) => {

  try {
    const { reportType, description, location, filedBy } = req.body;

    // Validate required fields
    if (!reportType || !description || !location || !filedBy) {
      return res.status(400).json({ error: "All fields are required: reportType, description, location, filedBy" });
    }

    // Validate location format
    if (typeof location !== 'object' || location.lat === undefined || location.lng === undefined) {
      return res.status(400).json({ error: "Location must be an object with lat and lng properties" });
    }

    // Validate filedBy as a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(filedBy)) {
      return res.status(400).json({ error: "Invalid user ID for filedBy" });
    }

    // Create and save the report
    const report = await Report.create({
      reportType,
      description,
      location,
      filedBy,
      status: "Pending",
      filedAt: new Date(),
    });

    res.status(201).json({ message: "Report filed successfully", report });

  } catch (error) {
    console.error("Error filing report:", error);
    res.status(500).json({ error: "Internal server error" });
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
