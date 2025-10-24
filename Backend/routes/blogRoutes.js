// routes/blogRoutes.js
import express from 'express';
import {
  getBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';
import uploadMultiple from '../middlewere/multerMultiple.js';

const router = express.Router();

router.post('/blog', uploadMultiple.any(), addBlog);
router.get('/blog', getBlogs);
router.get('/blog/:id', getBlogById);
router.put('/blog/:id', uploadMultiple.any(), updateBlog);
router.delete('/blog/:id', deleteBlog);

export default router;