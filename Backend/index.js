import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentRouter from "./routes/studentRoute.js";
import tutorRouter from "./routes/tutorRoute.js";
import serviceRouter from "./routes/serviceRoute.js";
import contactRouter from "./routes/contactRoutes.js";
import analyticsRoutes from "./routes/analytics.js";
import cors from "cors";



dotenv.config();

const app = express();
app.use(express.json());
// ✅ Increase JSON payload limit to 10MB
app.use(express.json({ limit: "10mb" }));

// ✅ Increase URL-encoded data limit (if using form data)
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  cors({
   origin: [
    'http://localhost:5173',
    'http://localhost:5174', // ← Add this!
  ],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api", studentRouter);
app.use("/api", serviceRouter);
app.use("/api", tutorRouter);
app.use("/api", contactRouter);
app.use('/api/analytics', analyticsRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
