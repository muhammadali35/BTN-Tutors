import mongoose from "mongoose";
const { Schema } = mongoose;
const testimonialModel = new Schema({
  name: {
    type: String,
    required: true,
  },
   title: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: false,
  },
  message: { 
    type: String,
    required: true,
  },
   
    createdAt: {
    type: Date,
    default: Date.now,
  },
});     
export default mongoose.model("Testimonial", testimonialModel);