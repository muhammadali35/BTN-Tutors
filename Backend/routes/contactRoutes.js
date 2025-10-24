import express from "express";
import { submitContactForm, getContactMessages } from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", submitContactForm);
router.get("/contact", getContactMessages);

export default router;