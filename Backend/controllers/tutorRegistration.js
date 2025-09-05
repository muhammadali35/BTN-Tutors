// src/controllers/tutorRegistration.js
import tutorSchema from "../models/tutorModel.js";
import bcrypt from 'bcrypt';
// import { sendAdminNotification } from "../utils/tutorEmail.js";

export const registerTutor = async (req, res) => {
  const {
    name,
    email,
    password,
    mobile,
    whatsapp,
    city,
    address,
    institution,
    experience,
    bio,
    subjects,
    otherSubjects,
    teachingMode,
    cnicNumber,
  } = req.body;

  const profilePic = req.files?.profilePic?.[0]?.filename || null;
  const idCardFront = req.files?.idCardFront?.[0]?.filename || null;
  const idCardBack = req.files?.idCardBack?.[0]?.filename || null;
  const Intermediate = req.files?.Intermediate?.[0]?.filename || null;
  const bachelorDoc = req.files?.bachelorDoc?.[0]?.filename || null;
  const mphilDoc = req.files?.mphilDoc?.[0]?.filename || null;

  try {
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    if (req.fileValidationError) {
      return res.status(400).json({ message: req.fileValidationError });
    }

    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });
    if (!mobile) return res.status(400).json({ message: "Mobile number is required" });
    if (!whatsapp) return res.status(400).json({ message: "WhatsApp number is required" });
    if (!city) return res.status(400).json({ message: "City is required" });
    if (!address) return res.status(400).json({ message: "Address is required" });
    if (!subjects && !otherSubjects) return res.status(400).json({ message: "At least one subject or other subject is required" });
    if (!teachingMode) return res.status(400).json({ message: "Teaching mode is required" });
    if (!cnicNumber) return res.status(400).json({ message: "CNIC Number is required" });
    if (!profilePic) return res.status(400).json({ message: "Profile picture is required" });
    if (!idCardFront) return res.status(400).json({ message: "ID Card Front is required" });
    if (!idCardBack) return res.status(400).json({ message: "ID Card Back is required" });
    if (!Intermediate && !bachelorDoc && !mphilDoc) {
      return res.status(400).json({ message: "At least one educational document is required" });
    }

    const existingTutorByEmail = await tutorSchema.findOne({ email });
    if (existingTutorByEmail) {
      return res.status(400).json({ message: "A tutor with this email already exists" });
    }

    const existingTutorByCNIC = await tutorSchema.findOne({ cnicNumber });
    if (existingTutorByCNIC) {
      return res.status(400).json({ message: "A tutor with this CNIC already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newTutor = new tutorSchema({
      name,
      email,
      password: hashedPassword,
      mobile,
      whatsapp,
      city,
      address,
      institution,
      experience,
      bio,
      subjects: Array.isArray(subjects) ? subjects : subjects ? subjects.split(",") : [],
      otherSubjects,
      teachingMode,
      cnicNumber,
      profilePic,
      idCardFront,
      idCardBack,
      Intermediate,
      bachelorDoc,
      mphilDoc,
    });

    await newTutor.save();

    // ✅ SendGrid Email Notification
    // await sendAdminNotification(newTutor);

    res.status(201).json({ message: "Tutor registered successfully" });
  } catch (error) {
    console.error("Tutor Registration Error:", error);
    res.status(500).json({
      message: error.message || "Server error during tutor registration",
    });
  }
};


export const getTutors = async (req, res) => {
  try {
    const tutors = await tutorSchema.find();
    console.log("Get Tutors endpoint hit", tutors);
    res.status(200).json(tutors);
  } catch (error) {
    console.error("Error fetching tutors:", error);
    res.status(500).json({ message: "Server error while fetching tutors" });
  }
};

export const getTutorById = async (req, res) => {
  const { id } = req.params;
  try {
    const tutor = await tutorSchema.findById(id);
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    console.log("Get Tutor by ID endpoint hit", tutor);
    res.status(200).json(tutor);
  } catch (error) {
    console.error("Error fetching tutor by ID:", error);
    res.status(500).json({ message: "Server error while fetching tutor by ID" });
  }
};

export const updateTutorStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const tutor = await tutorSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    res.status(200).json({
      message: `Tutor status updated to ${status}`,
      tutor,
    });
  } catch (error) {
    console.error("Error updating tutor status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTutor = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTutor = await tutorSchema.findByIdAndDelete(id);
    if (!deletedTutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.status(200).json({ message: "Tutor deleted successfully" });
  } catch (error) {
    console.error("Error deleting tutor:", error);
    res.status(500).json({ message: "Server error while deleting tutor" });
  }
};
