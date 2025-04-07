import AnonymousComplaint from '../models/AnonymousComplaint.js';

export const submitComplaint = async (req, res) => {
  try {
    const { tip, location } = req.body;

    if (!tip || !location) {
      return res.status(400).json({ message: 'Tip and location are required' });
    }

    const complaint = new AnonymousComplaint({
      tip,
      location,
      createdAt: new Date()
    });

    await complaint.save();
    res.status(201).json({ message: 'Complaint submitted anonymously', complaint });
  } catch (error) {
    console.error('Error submitting anonymous complaint:', error);
    res.status(500).json({ message: 'Error submitting complaint', error: error.message });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await AnonymousComplaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    console.error('Error retrieving anonymous complaints:', error);
    res.status(500).json({ message: 'Error retrieving complaints', error: error.message });
  }
};
