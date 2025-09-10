// routes/blogRoutes.js
import express from 'express';
import {
  getBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';
import upload from '../middlewere/multer.js'; 

const router = express.Router();

// Routes
router.post('/blog', upload.single("img"), addBlog);       // ✅ Create
router.get('/blog', getBlogs);                             // ✅ Read All
router.get('/blog/:id', getBlogById);                      // ✅ Read Single
router.put('/blog/:id', upload.single("img"), updateBlog); // ✅ Update
router.delete('/blog/:id', deleteBlog);                    // ✅ Delete

export default router;