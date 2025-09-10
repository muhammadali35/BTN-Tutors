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
  desc: {
    type: String,
    required: true,
    trim: true,
    maxlength: 5000
  },
  img: {
    type: String,
    required: false
  },
  date: {
    type: String, // You can also use Date if preferred
    required: false
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Blog", blogModel);