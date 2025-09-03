// routes/serviceRoute.js
import express from "express";
const router = express.Router();

import upload from './../middlewere/multer.js'; // ✅ spelling: middleware
import { addServices, getServices, updateServices, deleteServices } from './../controllers/service.js';

// ✅ POST: Add new service
router.post('/service', upload.single("img"), addServices);

// ✅ GET: Get all services
router.get('/service', getServices);

// ✅ PUT: Update service by ID
router.put('/service/:id', upload.single("img"), updateServices); // ✅ Add upload if updating image

// ✅ DELETE: Delete service by ID
router.delete('/service/:id', deleteServices); // ✅ Fixed: /service (not /services)

export default router;