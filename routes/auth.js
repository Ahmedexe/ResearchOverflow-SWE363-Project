// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// @route   POST /api/signup
// @desc    Register new user
router.post("/signup", async (req, res) => {
  const { fname, lname, email, password, role } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    // Create new user
    const newUser = new User({ fname, lname, email, password, role });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login route (for completeness, not in the original request)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials (email)" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials (password)" });
    }

    res.status(200).json({ msg: "Login successful", userId: user._id, userType : user.type });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
// changePassword route (for completeness, not in the original request)
router.post("/changePass", async (req, res) => {
  let { id, oldPass, newPass } = req.body;

  try {
    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: "Invalid user" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(oldPass, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid oldPass" });
    }
    const salt = await bcrypt.genSalt(10); // Generate salt
    newPass = await bcrypt.hash(newPass, salt); // Hash password

    await User.findByIdAndUpdate(id, { password: newPass }, { new: true });
    res.status(200).json({ msg: "password changed successfully" });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// getUsersTable route (for completeness, not in the original request)
router.get("/getUsers", async (req, res) => {
  try {
    // Check if user exists
    const users = await User.find({ type: "user" });
    if (!users) {
      return res.status(400).json({ msg: "Invalid user" });
    }
    res.status(200).json({ users: users });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// getUser route (for completeness, not in the original request)
router.get("/getUser/:id", async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ msg: "Invalid user" });
    }
    res.status(200).json({ user: user });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// updateUserTable route (for completeness, not in the original request)
router.put("/updateUser/:id", async (req, res) => {
  try {
    // Check if user exists
    const users = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    );
    if (!users) {
      return res.status(400).json({ msg: "Invalid user" });
    }
    res.status(200).json({ users: users });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
// deleteUserTable route (for completeness, not in the original request)
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    // Check if user exists
    const users = await User.findByIdAndDelete(req.params.id);
    if (!users) {
      return res.status(400).json({ msg: "Invalid user" });
    }
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// getCount route (for completeness, not in the original request)
router.get("/getCount", async (req, res) => {
  try {
    // Aggregate to group by role and count
    const roleCounts = await User.aggregate([
      { $match: { type: "user" } },
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 }
        }
      }
    ]);

    // Total users with type 'user'
    const totalUsers = await User.countDocuments({ type: "user" });

    // Initialize counts
    let readerCount = 0;
    let researcherCount = 0;

    // Extract counts from aggregation result
    roleCounts.forEach(role => {
      if (role._id === "Reader") readerCount = role.count;
      if (role._id === "Researcher") researcherCount = role.count;
    });

    res.status(200).json({
      totalUsers,
      readerCount,
      researcherCount
    });
  } catch (err) {
    console.error("Get Users Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;