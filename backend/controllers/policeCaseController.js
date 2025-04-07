import PoliceCase from '../models/policeCaseModel.js';

export const fileCase = async (req, res) => {
  try {
    const {
      caseNumber,
      reportingOfficer,
      badgeNumber,
      dateTime,
      location,
      incidentType,
      victimName,
      victimContactInfo,
      description,
      additionalInfo,
      status,
      priority
    } = req.body;

    // Cloudinary uploaded file URL (if any)
    const media = req.file?.path || ''; // 'path' is the Cloudinary-hosted URL

    console.log("📥 POLICECASECONTROLLER RECEIVED:", {
      ...req.body,
      fileUploaded: !!req.file,
      mediaURL: media,
    });

    // Required fields check
    if (
      !caseNumber ||
      !reportingOfficer ||
      !badgeNumber ||
      !dateTime ||
      !location ||
      !incidentType ||
      !victimName ||
      !victimContactInfo
    ) {
      return res.status(400).json({
        error: 'Missing required fields: caseNumber, officer details, dateTime, location, incidentType, victim info'
      });
    }

    // Create new case document
    const newCase = await PoliceCase.create({
      caseNumber,
      reportingOfficer,
      badgeNumber,
      dateTime,
      location,
      incidentType,
      victimName,
      victimContactInfo,
      description,
      evidence: media, // save Cloudinary file URL under "evidence"
      additionalInfo,
      status,
      priority
    });

    res.status(201).json({
      message: 'Case filed successfully',
      case: newCase,
    });

  } catch (error) {
    console.error("❌ Error filing case:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllCases = async (req, res) => {
  try {
    const cases = await PoliceCase.find().sort({ dateTime: -1 });
    res.status(200).json(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
