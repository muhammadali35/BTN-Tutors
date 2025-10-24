// controllers/blogController.js
import Blog from '../models/blogModel.js';

// Helper: Map uploaded files by fieldname
const mapFiles = (files = []) => {
  const fileMap = {};
  files.forEach(file => {
    fileMap[file.fieldname] = file;
  });
  return fileMap;
};

export const addBlog = async (req, res) => {
  console.log('📁 Received files:', req.files); // 👈 Add this
console.log('🧱 Blocks:', req.body.blocks);
  try {
    const { title, category, date, blocks: blocksJson } = req.body;



    if (!title || !category || !blocksJson) {
      return res.status(400).json({ message: 'Title, category, and blocks are required' });
    }

    let blocks;
    try {
      blocks = JSON.parse(blocksJson);
    } catch (e) {
      return res.status(400).json({ message: 'Invalid blocks JSON' });
    }

    if (!Array.isArray(blocks) || blocks.length === 0) {
      return res.status(400).json({ message: 'Blocks must be a non-empty array' });
    }

    const fileMap = mapFiles(req.files);
    const processedBlocks = [];

    for (const block of blocks) {
      if (block.type === 'text' || block.type === 'subtitle') {
        processedBlocks.push({
          type: block.type,
          content: block.content || ''
        });
      } else if (block.type === 'image') {
        let imageUrl = '';
        if (block.id && fileMap[block.id]) {
          const file = fileMap[block.id];
          imageUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
        } else if (block.url) {
          imageUrl = block.url; // fallback (e.g., edit mode)
        }
        processedBlocks.push({
          type: 'image',
          url: imageUrl
        });
      } else {
        return res.status(400).json({ message: `Invalid block type: ${block.type}` });
      }
    }

    const newBlog = new Blog({
      title,
      category,
      date: date || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      blocks: processedBlocks
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog added successfully', blog: newBlog });
  } catch (error) {
    console.error('Error adding blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, date, blocks: blocksJson } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const updateData = {};
    if (title) updateData.title = title;
    if (category) updateData.category = category;
    if (date) updateData.date = date;

    if (blocksJson) {
      let blocks;
      try {
        blocks = JSON.parse(blocksJson);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid blocks JSON' });
      }

      const fileMap = mapFiles(req.files);
      const processedBlocks = [];

      for (const block of blocks) {
        if (block.type === 'text' || block.type === 'subtitle') {
          processedBlocks.push({
            type: block.type,
            content: block.content || ''
          });
        } else if (block.type === 'image') {
          let imageUrl = block.url || ''; // keep existing if no new file
          if (block.id && fileMap[block.id]) {
            const file = fileMap[block.id];
            imageUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
          }
          processedBlocks.push({
            type: 'image',
            url: imageUrl
          });
        }
      }
      updateData.blocks = processedBlocks;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};