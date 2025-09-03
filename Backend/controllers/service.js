import serviceModel from './../models/serviceModel.js'

export const addServices=async(req,res)=>{
    const {title,description}=req.body
   try {
        const Newservice=await serviceModel.create({
        image:req.file ?req.file.fileName:null,
        title,
        description
    })
     res.status(201).json({message:"Service created successfully".Newservice})
   } catch (error) {
       res.status(404).json({message:"interal server error"})
   }
}
export const getServices= async(req,res)=>{
const findService=await serviceModel.find()
  if (!findService || findService.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }
     res.json({
      count:findService.length,
      message: "Students fetched successfully",
      findService
     })
}
export const updateServices=async(req,res)=>{
const {id,title,description}=req.body
  try {
    const updateService=await serviceModel.findByIdAndUpdate(id,{
        title,
        description
    },{new:true})
    res.status(200).json({message:"Service updated successfully",updateService})
  } catch (error) {
    res.status(404).json({message:"interal server error"})
  }
}
export const deleteServices=async(req,res)=>{
const {id}=req.body
  try {
    const deleteService=await serviceModel.findByIdAndDelete(id)
    res.status(200).json({message:"Service deleted successfully",deleteService})
  } catch (error) {
    res.status(404).json({message:"interal server error"})
  }
}