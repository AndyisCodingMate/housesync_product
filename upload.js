// const fs = require("fs");
// const multer = require("multer");
// const path = require("path");

// //Ensure 'uploads/' exists
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//     console.log(`Created directory: ${uploadDir}`);
// } else {
//     console.log(`Directory already exists: ${uploadDir}`);
// }

// //Set up storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir); //Save files in 'uploads/'
//     },
//     filename: (req, file, cb) => {
//         const uniqueName = Date.now() + path.extname(file.originalname);
//         console.log(`Saving file as: ${uniqueName}`);
//         cb(null, uniqueName); //Unique filename
//     }
// });

// //File upload middleware
// const upload = multer({ storage });

// module.exports = upload;



const fs = require("fs");
const multer = require("multer");
const path = require("path");

// Ensure 'uploads/' exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Created directory: ${uploadDir}`);
} else {
    console.log(`Directory already exists: ${uploadDir}`);
}

// Set up storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save files in 'uploads/'
    },
    filename: (req, file, cb) => {
        console.log(`Saving file as: ${file.originalname}`);
        cb(null, file.originalname); // Use the original file name
    }
});

// File upload middleware
const upload = multer({ storage });

module.exports = upload;