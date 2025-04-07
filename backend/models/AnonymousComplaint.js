import mongoose from 'mongoose';

const anonymousComplaintSchema = new mongoose.Schema({
  tip: { type: String, required: true },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  createdAt: { type: Date, default: Date.now }
});

const AnonymousComplaint = mongoose.model('AnonymousComplaint', anonymousComplaintSchema);

export default AnonymousComplaint;
