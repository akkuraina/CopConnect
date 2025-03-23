import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: function() { return this.role !== 'admin'; } },

  phone: { type: String, required: function() { return this.role === 'citizen'; } },

  badgeNumber: { type: String, required: function() { return this.role === 'police'; }, unique: function() { return this.role === 'police'; } },

  adminId: { type: String, required: function() { return this.role === 'admin'; }, unique: function() { return this.role === 'admin'; } },

  password: { type: String, required: function() { return this.role === 'admin'; } },  // Only Admin requires a password
  role: { 
    type: String, 
    enum: ['police', 'citizen', 'admin', 'anonymous'], 
    required: true 
  }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
