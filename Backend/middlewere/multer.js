// src/middleware/multer.js
import multer from "multer";
import path from "path";

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists: `uploads/`
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = file.fieldname + "-" + uniqueSuffix + ext;
    cb(null, filename); // e.g., bachelorDoc-123456789.jpg
  },
});

// ✅ Allow images, PDF, and Word files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.test(ext)) {
    cb(null, true); // Accept file
  } else {
    cb(null, false); // Reject file
    // ✅ Do not throw error → avoid 500
    req.fileValidationError = `Invalid file type. Only JPG, PNG, PDF, DOC, DOCX allowed. Got: ${ext}`;
  }
};

// ✅ Limits: Max 5MB per file
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default upload;