// src/controllers/testimonialController.js
import Testimonial from '../models/testimonialModel.js';

/**
 * ✅ Add a new testimonial
 * Supports image upload via multer
 */
export const addTestimonial = async (req, res) => {
  try {
    const { name, title, message } = req.body;

    // Validate required fields
    if (!name || !title || !message) {
      return res.status(400).json({
        message: 'Name, title, and message are required',
      });
    }

    // Generate image URL if file uploaded
    let imagePath = '';
    if (req.file) {
      imagePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    // Create new testimonial
    const newTestimonial = new Testimonial({
      name,
      title,
      message,
      Image: imagePath, // Save image URL
    });

    await newTestimonial.save();

    res.status(201).json({
      message: 'Testimonial added successfully',
      testimonial: newTestimonial,
    });
  } catch (error) {
    console.error('Error adding testimonial:', error);
    res.status(500).json({
      message: 'Server error while adding testimonial',
      error: error.message,
    });
  }
};

/**
 * ✅ Get all testimonials
 * Sorted by latest first
 */
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      message: 'Server error while fetching testimonials',
      error: error.message,
    });
  }
};

/**
 * ✅ Delete a testimonial by ID
 */
export const deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
    if (!deletedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({
      message: 'Server error while deleting testimonial',
      error: error.message,
    });
  }
};

/**
 * ✅ Update a testimonial
 * Supports updating text and/or image
 */
export const updateTestimonial = async (req, res) => {
  try {
    const { name, title, message } = req.body;
    const { id } = req.params;

    // Build update object
    const updateData = { name, title, message };

    // If new image uploaded, update image URL
    if (req.file) {
      updateData.Image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return updated doc
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json({
      message: 'Testimonial updated successfully',
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({
      message: 'Server error while updating testimonial',
      error: error.message,
    });
  }
};