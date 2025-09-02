import mongoose, { Schema } from "mongoose";

const serviceModel=new Schema({
    image:{
    type:String
    },
   title:{
    type:String
  },
   description:{
    type:String
   }
   
})
export default mongoose.model("service",serviceModel)