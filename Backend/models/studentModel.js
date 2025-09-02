import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
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
      minlength: 8,
    },
    mobile: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    tuitionMode: {
      type: String,
      enum: ["home", "online"], 
      required: true,
    },
    subjects: {
      type: [String],
      required: true,
    },
    otherSubjects: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
