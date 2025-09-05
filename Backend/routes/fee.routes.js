// src/routes/fee.routes.js
import { Router } from "express";
import { addFee, getFeesByStudent, getAllFees, updateFee, deleteFee } from "../controllers/fee.controller.js";

const router = Router();

router.post('/add', addFee);
router.get('/student/:studentId', getFeesByStudent);
router.get('/all', getAllFees);
// ✅ New Routes
router.patch('/:id', updateFee);     // PATCH /api/fees/:id
router.delete('/:id', deleteFee);    // DELETE /api/fees/:id

export default router;