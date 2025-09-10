// controllers/blogController.js
import Blog from '../models/blogModel.js';

/**
 * ✅ Add a new blog
 * Supports image upload via multer (optional)
 */
export const addBlog = async (req, res) => {
  try {
    const { title, desc, category, date } = req.body;

    // Validate required fields
    if (!title || !desc || !category) {
      return res.status(400).json({
        message: 'Title, description, and category are required',
      });
    }

    // Handle image if uploaded
    let imagePath = '';
    if (req.file) {
      imagePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    } else if (req.body.img) {
      imagePath = req.body.img; // Allow direct URL
    }

    // Create new blog
    const newBlog = new Blog({
      title,
      desc,
      img: imagePath,
      date: date || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      category
    });

    await newBlog.save();

    res.status(201).json({
      message: 'Blog added successfully',
      blog: newBlog
    });
  } catch (error) {
    console.error('Error adding blog:', error);
    res.status(500).json({
      message: 'Server error while adding blog',
      error: error.message
    });
  }
};

/**
 * ✅ Get all blogs
 * Sorted by latest first
 */
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      message: 'Server error while fetching blogs',
      error: error.message
    });
  }
};

/**
 * ✅ Get single blog by ID
 */
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      message: 'Server error while fetching blog',
      error: error.message
    });
  }
};

/**
 * ✅ Update a blog
 * Supports updating all fields + image
 */
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, category, date } = req.body;

    // Build update object
    const updateData = {};
    if (title) updateData.title = title;
    if (desc) updateData.desc = desc;
    if (category) updateData.category = category;
    if (date) updateData.date = date;

    // Handle image update
    if (req.file) {
      updateData.img = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    } else if (req.body.img !== undefined) {
      updateData.img = req.body.img; // Allow clearing or setting via URL
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({
      message: 'Blog updated successfully',
      blog: updatedBlog
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      message: 'Server error while updating blog',
      error: error.message
    });
  }
};

/**
 * ✅ Delete a blog by ID
 */
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      message: 'Server error while deleting blog',
      error: error.message
    });
  }
};