// Import required modules
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Create an Express router
const router = express.Router();

// Initialize Google Generative AI
const apiKey = process.env.GEMINI_API_KEY; // Ensure the API key is set in the .env file
const genAI = new GoogleGenerativeAI(apiKey);

// Set up the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Define the generation configuration
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Handle chat requests
router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message; // Extract the user's message from the request body

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" }); // Return 400 for bad requests
    }

    // Start a new chat session
    const chatSession = model.startChat({
      generationConfig,
      history: [], // Add previous messages here if you want to maintain context
    });

    // Send the user's message and get a response
    const result = await chatSession.sendMessage(userMessage);

    // Send the response back to the client
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error handling chat request:", error);
    res.status(500).json({ error: "Internal server error" }); // Return a JSON error response
  }
});

// Export the router
module.exports = router;
