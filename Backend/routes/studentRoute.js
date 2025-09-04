import express from "express";
import { stuRegistration,getStudents, updateStudentStatus } from "../controllers/StudentRegistration.js"; 

const router = express.Router();

router.post("/studentReg", stuRegistration);
router.get("/getStudent", getStudents);
router.patch('/students/:id/status', updateStudentStatus); // ✅ New route

export default router;
