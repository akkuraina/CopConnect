import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    // name for police and citizen
  name: { type: String, required: function() { return this.role !== 'admin'; } },

  // phone for citizen
  phone: { type: String, required: function() { return this.role === 'citizen'; } },

  // badge number only for police
  badgeNumber: { type: String, required: function() { return this.role === 'police'; }},

  // only for admin
  adminId: { type: String, required: function() { return this.role === 'admin'; }},

  // Only Admin requires a password
  password: { type: String, required: function() { return this.role === 'admin'; } },  
  role: { 
    type: String, 
    enum: ['police', 'citizen', 'admin', 'anonymous'], 
    required: true 
  }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
