import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentRouter from "./routes/studentRoute.js";
import tutorRouter from "./routes/tutorRoute.js";
import serviceRouter from "./routes/serviceRoute.js";
import contactRouter from "./routes/contactRoutes.js";
import cors from "cors";



dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
