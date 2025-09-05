// controllers/serviceController.js
import serviceModel from './../models/serviceModel.js';

// ✅ Add Service
export const addServices = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Title and description are required",
    });
  }

  try {
    const newService = await serviceModel.create({
      image: req.file ? req.file.filename : null,
      title,
      description,
    });

    res.status(201).json({
      message: "Service created successfully",
      newService,
    });
  } catch (error) {
    console.error('Error in addServices:', error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ✅ Get All Services
export const getServices = async (req, res) => {
  try {
    const findService = await serviceModel.find();

    if (!findService || findService.length === 0) {
      return res.status(404).json({
        message: "No services found",
      });
    }

    res.status(200).json({
      count: findService.length,
      message: "Services fetched successfully",
      findService,
    });
  } catch (error) {
    console.error('Error in getServices:', error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ✅ Update Service
export const updateServices = async (req, res) => {
  const { id } = req.params; // ✅ Correct: from URL
  const { title, description } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Service ID is required",
    });
  }

  try {
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (req.file) updateData.image = req.file.filename;

    const updateService = await serviceModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updateService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json({
      message: "Service updated successfully",
      updateService,
    });
  } catch (error) {
    console.error('Error in updateServices:', error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ✅ Delete Service
export const deleteServices = async (req, res) => {
  const { id } = req.params; // ✅ Correct: from URL, not body

  if (!id) {
    return res.status(400).json({
      message: "Service ID is required",
    });
  }

  try {
    const deleteService = await serviceModel.findByIdAndDelete(id);

    if (!deleteService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json({
      message: "Service deleted successfully",
      deleteService,
    });
  } catch (error) {
    console.error('Error in deleteServices:', error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};