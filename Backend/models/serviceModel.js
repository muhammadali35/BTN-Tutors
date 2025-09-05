// models/serviceModel.js
import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    image: {
      type: String,
      required: false, // Image optional ho sakti hai
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true, 
      // minlength: [2, "Title must be at least 2 characters long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      // minlength: [10, "Description must be at least 10 characters long"],
    },
  },
  {
    timestamps: true, // ✅ Automatically adds createdAt & updatedAt
  }
);

// ✅ Optional: Index on title for faster search
serviceSchema.index({ title: 1 });

// ✅ Export model with capitalized name
export default mongoose.model("Service", serviceSchema);