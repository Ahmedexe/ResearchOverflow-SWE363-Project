// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


// @route   POST /api/signup
// @desc    Register new user
router.post('/signup', async (req, res) => {
  const { fname, lname, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    // Create new user
    const newUser = new User({ fname, lname, email, password });
    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route (for completeness, not in the original request)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials (email)' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials (password)' });
      }
  
      res.status(200).json({ msg: 'Login successful' });
    } catch (err) {
      console.error('Login Error:', err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  });

module.exports = router;
