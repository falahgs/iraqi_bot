// Import required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const chatRouter = require("./api/chat");

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.static("public")); // Serve static files from the public directory

// API routes
app.use("/api/chat", chatRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

