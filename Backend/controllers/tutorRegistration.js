import tutorSchema from "../models/tutorModel.js";
import bcrypt from 'bcrypt';

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
    subjects, // Expecting an array from FormData
    otherSubjects,
    teachingMode,
  } = req.body;

  const profilePic = req.files?.profilePic?.[0]?.filename || null;
  const idCardFront = req.files?.idCardFront?.[0]?.filename || null;
  const idCardBack = req.files?.idCardBack?.[0]?.filename || null;
  const Intermediate = req.files?.Intermediate?.[0]?.filename || null;
  const bachelorDoc = req.files?.bachelorDoc?.[0]?.filename || null;
  const mphilDoc = req.files?.mphilDoc?.[0]?.filename || null;

  try {
    // Log incoming data for debugging
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    // Server-side validation
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });
    if (!mobile) return res.status(400).json({ message: "Mobile number is required" });
    if (!whatsapp) return res.status(400).json({ message: "WhatsApp number is required" });
    if (!city) return res.status(400).json({ message: "City is required" });
    if (!address) return res.status(400).json({ message: "Address is required" });
    if (!subjects && !otherSubjects) return res.status(400).json({ message: "At least one subject or other subject is required" });
    if (!teachingMode) return res.status(400).json({ message: "Teaching mode is required" });
    if (!profilePic) return res.status(400).json({ message: "Profile picture is required" });
    if (!idCardFront) return res.status(400).json({ message: "ID Card Front is required" });
    if (!idCardBack) return res.status(400).json({ message: "ID Card Back is required" });
    if (!Intermediate && !bachelorDoc && !mphilDoc) {
      return res.status(400).json({ message: "At least one educational document is required" });
    }

    // Check for existing tutor
    const existingTutor = await tutorSchema.findOne({ email });
    if (existingTutor) {
      return res.status(400).json({ message: "Tutor already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new tutor
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
      subjects: Array.isArray(subjects) ? subjects : subjects ? subjects.split(",") : [], // Handle both array and string
      otherSubjects,
      teachingMode,
      profilePic,
      idCardFront,
      idCardBack,
      Intermediate,
      bachelorDoc,
      mphilDoc,
    });

    await newTutor.save();
    res.status(201).json({ message: "Tutor registered successfully" });
  } catch (error) {
    console.error("Tutor Registration Error:", error);
    res.status(500).json({ message: error.message || "Server error during tutor registration" });
  }
};
export const getTutors = async (req, res) => {
  try {
    const tutors = await tutorSchema.find();
    res.status(200).json(tutors);
      console.log("Get Tutors endpoint hit",tutors);
  } catch (error) {
    console.error("Error fetching tutors:", error);
    res.status(500).json({ message: "Server error while fetching tutors" });
  }

}
