import express from "express";
const router = express.Router();
import upload from './../middlewere/upload.js'
import {addServices,getServices} from './../controllers/service.js'

router.post('/service',upload.single("image"),addServices)
router.get('/getService',getServices)
 
export default router