import express from "express";
import { stuRegistration,getStudents } from "../controllers/StudentRegistration.js"; 

const router = express.Router();

router.post("/studentReg", stuRegistration);
router.get("/getStudent", getStudents);

export default router;
