// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

app.use(cors()); // Enable CORS for all routes
dotenv.config();
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', require('./routes/auth'));  // Mount the signup route

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));