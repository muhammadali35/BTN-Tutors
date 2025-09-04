import express from "express";
const router = express.Router();
import { registerTutor,getTutors,getTutorById, updateTutorStatus } from "../controllers/tutorRegistration.js";
import upload from "../middlewere/multer.js"

// Route for tutor registration with file uploads
router.post(
  "/tutorReg",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "idCardFront", maxCount: 1 },
    { name: "idCardBack", maxCount: 1 },
    { name: "Intermediate", maxCount: 1 },
    { name: "bachelorDoc", maxCount: 1 },
    { name: "mphilDoc", maxCount: 1 },
  ]),
  registerTutor
);
router.get("/tutors", getTutors);
router.get("/tutors/:id", getTutorById);
router.patch("/tutors/:id/status", updateTutorStatus); // Add this route


export default router;