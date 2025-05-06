<<<<<<< Updated upstream
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
=======
const express = require("express");
const path = require("path");
const multer = require("multer");
const verifyFaceHandler = require("./verify-face"); // Import the handler function
require("dotenv").config(); // Load environment variables

const app = express();

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// Serve the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// File upload route
app.post("/upload", upload.fields([{ name: "document" }, { name: "selfie" }]), (req, res) => {
    const { document, selfie } = req.files;

    if (!document || !selfie) {
        console.log("Missing files");
        return res.status(400).json({ message: "Both document and selfie are required" });
    }

    console.log("Uploaded files:", { document: document[0], selfie: selfie[0] });

    // Pass files to the face verification handler
    verifyFaceHandler(document[0], selfie[0])
        .then((match) => {
            if (match) {
                res.json({ message: "Files verified and uploaded successfully" });
            } else {
                res.status(400).json({ message: "Files do not match" });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Error verifying files" });
        });
});

// Face verification route (if needed separately)
app.post("/verify-face", (req, res) => {
    verifyFaceHandler(req, res); // Delegate to the handler in verify-face.js
});

const PORT = 3001; // Change port to 3001 to avoid conflicts with frontend
>>>>>>> Stashed changes
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));