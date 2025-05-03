// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true},
  lname: { type: String, required: true},
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Pre-save hook to hash password before saving
UserSchema.pre('save', async function (next) {
    // Skip hashing if password is not modified (e.g., user update)
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);              // Generate salt
      this.password = await bcrypt.hash(this.password, salt); // Hash password
      next();
    } catch (err) {
      return next(err);  // Pass error to save()
    }
  });

module.exports = mongoose.model('User', UserSchema);
