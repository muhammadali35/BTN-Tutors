import mongoose, { Schema } from "mongoose";

const tutorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
    },
    experience: {
      type: String, // you can use Number if you want years only
    },
    bio: {
      type: String,
    },
    subjects: {
      type: [String],
      required: true,
    },
    otherSubjects: {
      type: String,
    },
    teachingMode: {
      type: String,
      enum: ["home", "online", "both"], // extend as needed
      required: true,
    },
     cnicNumber: {                 // ✅ CNIC Number
      type: String,
      required: true,
      trim: true,
      unique: true,               // ✅ Unique bana diya
      match: [/^\d{5}-\d{7}-\d{1}$/, "Please enter a valid CNIC number (e.g. 35201-1234567-8)"]
    },
    profilePic: {
      type: String, // store file path / URL
    },
    idCardFront: {
      type: String,
    },
    idCardBack: {
      type: String,
    },
    Intermediate: {
      type: String,
    },
    bachelorDoc: {
      type: String,
    },
    mphilDoc: {
      type: String,
    },
      // ✅ Status field
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tutor", tutorSchema);
