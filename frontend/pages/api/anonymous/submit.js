import dbConnect from '@/lib/dbConnect';
import AnonymousComplaint from '@/models/AnonymousComplaint';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const { tip, location } = req.body;

    const newTip = new AnonymousComplaint({ tip, location });
    await newTip.save();

    res.status(200).json({ success: true, message: 'Tip submitted successfully' });
  } catch (err) {
    console.error('Error saving tip:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
}
