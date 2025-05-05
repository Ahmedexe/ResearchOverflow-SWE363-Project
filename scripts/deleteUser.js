// scripts/deleteUser.js
const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust the path as necessary

// Connect to local MongoDB
connectDB();

// Define User model (you can reuse your existing one)
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  password: String
}));

// Delete user by email
async function deleteUserByEmail(email) {
  try {
    const result = await User.deleteOne({ email });
    console.log(`Deleted ${result.deletedCount} user(s) with email: ${email}`);
    mongoose.disconnect();
  } catch (err) {
    console.error('Error deleting user:', err);
  }
}

// Replace this with the email you want to delete
deleteUserByEmail('aa@example.com');
