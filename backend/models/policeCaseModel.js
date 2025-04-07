import mongoose from 'mongoose';

const PoliceCaseSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  reportingOfficer: {
    type: String,
    required: true,
  },
  badgeNumber: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  incidentType: {
    type: String,
    required: true,
  },
  victimName: {
    type: String,
    required: true,
  },
  victimContactInfo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  evidence: {
    type: String, // store file path or cloud URL
  },
  media: {
    type: String, // image/video URL or path
  },
  additionalInfo: {
    type: String,
  },
  status: {
    type: String,
    enum: String,
    default: 'Open',
  },
  priority: {
    type: String,
    enum: String,
    default: 'Medium',
  }
});

const PoliceCase = mongoose.model('PoliceCase', PoliceCaseSchema);
export default PoliceCase;
