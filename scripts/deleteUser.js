// scripts/deleteUser.js
const mongoose = require('mongoose');

// Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017/researchoverflow', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

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
