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
  },
  { timestamps: true }
);

export default mongoose.model("Tutor", tutorSchema);
