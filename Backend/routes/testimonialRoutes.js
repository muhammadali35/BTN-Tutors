import express from 'express';
import { getTestimonials, addTestimonial,updateTestimonial,deleteTestimonial } from '../controllers/testimonialController.js';
import upload from '../middlewere/multer.js';


const router = express.Router();
router.post('/testimonial',upload.single("Image"), addTestimonial);
router.get('/testimonial', getTestimonials);
router.put('/testimonial/:id', upload.single("Image"), updateTestimonial);
router.delete('/testimonial/:id', deleteTestimonial);
export default router;
