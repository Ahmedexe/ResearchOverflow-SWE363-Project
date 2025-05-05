const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { ConeStriped } = require('react-bootstrap-icons');

router.post('/signup', async (req, res) => {
  const { fname, lname, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }


    // Create and save new user
    const newUser = new User({
      fname,
      lname,
      email: email.toLowerCase(),
      password,
    });

    await newUser.save();

    // Respond with user info (excluding password)
    res.status(201).json({
      msg: 'User registered successfully',
      user: {
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// ===============================
// @route   POST /api/login
// @desc    Login user
// ===============================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials (email)' });
    }
    console.log(user)

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`${password}  and ${user.password}`)
    console.log('isMatch:', isMatch); // Debugging line
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials (password ):' });
    }

    // Return user (excluding password)
    res.status(200).json({
      msg: 'Login successful',
      user: {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// ===============================
// @route   PUT /api/user/update
// @desc    Update user info
// ===============================
router.put('/user/update', async (req, res) => {
  const { originalEmail, email, fname, lname, phone } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: originalEmail.toLowerCase() }, // Search by original
      {
        $set: {
          fname,
          lname,
          phone,
          email: email.toLowerCase(), // Allow updating email
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({
      msg: 'User updated successfully',
      user: {
        fname: updatedUser.fname,
        lname: updatedUser.lname,
        email: updatedUser.email,
        phone: updatedUser.phone || '',
      },
    });
  } catch (err) {
    console.error('Update Error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
