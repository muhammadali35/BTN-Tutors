import express from "express";
import { stuRegistration,getStudents, updateStudentStatus, deleteStudent } from "../controllers/StudentRegistration.js"; 

const router = express.Router();

router.post("/studentReg", stuRegistration);
router.get("/getStudent", getStudents);
router.patch('/students/:id/status', updateStudentStatus); // ✅ New route
router.delete('/students/:id', deleteStudent); 

export default router;
