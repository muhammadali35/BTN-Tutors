import Testimonial from "../models/testimonialModel.js";

// ✅ Add Testimonial
export const addTestimonial = async (req, res) => {
  try {
    const { name, title, message } = req.body;

    // Validation
    if (!name || !title || !message) {
      return res
        .status(400)
        .json({ message: "Name, title, and message are required" });
    }

    // Agar image file ayi hai
    let imagePath = "";
    if (req.file) {
      imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`; 
      // ⚡ ab full URL generate hoga
    }

    const newTestimonial = new Testimonial({
      name,
      title,
      Image: imagePath,
      message,
    });

    await newTestimonial.save();

    res.status(201).json({
      message: "Testimonial added successfully",
      testimonial: newTestimonial,
    });
  } catch (error) {
    console.error("Error adding testimonial:", error);
    res
      .status(500)
      .json({ message: "Server error while adding testimonial" });
  }
};


// ✅ Get All Testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching testimonials" });
  }
};

// ✅ Delete Testimonial
export const deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res
      .status(500)
      .json({ message: "Server error while deleting testimonial" });
  }
};

// ✅ Update Testimonial
// Testimonial Update Controller
export const updateTestimonial = async (req, res) => {
  try {
    const { name, title, message } = req.body;
    let updateData = { name, title, message };

    if (req.file) {
      // Agar image upload hui hai
      updateData.Image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.json(updated); // ✅ Sirf updated testimonial bhej raha hun
  } catch (error) {
    res.status(500).json({ message: "Error updating testimonial", error });
  }
};
