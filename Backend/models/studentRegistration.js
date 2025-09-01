import mongoose, { Schema } from "mongoose";

const studentModel = new Schema({
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Mobile: {
    type: String, 
    required: true,
  },
  Province: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  HomeAddress: {
    type: String,
    required: true,
  },
  SchoolName: {
    type: String,
    required: true,
  },
  TuitionMode: {
    type: String,
    enum: ["home", "online"], // ✅ only two values
    required: true,
  },
  Subjects: {
    type: [String],
    required: true,
  },
});

export default mongoose.model("Student", studentModel);
