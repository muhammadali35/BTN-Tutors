import express from "express";
const router = express.Router();
import upload from '../middlewere/multer.js'
import {addServices,getServices,updateServices,deleteServices} from './../controllers/service.js'

router.post('/service',upload.single("image"),addServices)
router.get('/service',getServices)
router.put('/service/:id',updateServices)
router.delete('/services/:id',deleteServices)
 
export default router