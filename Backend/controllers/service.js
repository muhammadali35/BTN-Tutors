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

