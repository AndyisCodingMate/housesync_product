const express = require("express");
const upload = require("./upload");
const path = require("path");
const verifyFaceHandler = require("./verify-face"); // Import the handler function
require("dotenv").config(); // Load environment variables

const app = express();

// Serve the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// File upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ message: "No file uploaded" });
  }

  console.log("Uploaded file details:", req.file); // Log the file details
  res.json({ message: "File uploaded successfully", filePath: req.file.path });
});

// Face verification route
app.post("/verify-face", (req, res) => {
  verifyFaceHandler(req, res); // Delegate to the handler in verify-face.js
});

const PORT = 3001; // Change port to 3001 to avoid conflicts with frontend
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
