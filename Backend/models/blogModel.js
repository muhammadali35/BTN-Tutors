// models/blogModel.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const blogModel = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: false
  },
  blocks: [{
    type: {
      type: String,
      enum: ['text', 'subtitle', 'image'],
      required: true
    },
    content: String, // for text/subtitle
    url: String      // for image
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Blog", blogModel);