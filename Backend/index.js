// index.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentRouter from "./routes/studentRoute.js";
import tutorRouter from "./routes/tutorRoute.js";
import serviceRouter from "./routes/serviceRoute.js";
import contactRouter from "./routes/contactRoutes.js";
import TestimonialRouter from "./routes/testimonialRoutes.js";
import feeRoutes from './routes/fee.routes.js';
import analyticsRoutes from "./routes/analytics.js";
import blogRoutes from './routes/blogRoutes.js';
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";

// ✅ Socket import karo (sahi path ke sath)
import io from "./utils/socket.js"; // 👈 yeh line important hai

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Socket.IO ko server se joro
io.attach(server);

// ✅ Ab io use karo
io.on("connection", (socket) => {
  console.log("✅ Admin connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id);
  });
});

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  })
);

app.use('/uploads', express.static(path.join(__dirname, "uploads")));

// MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api", studentRouter);
app.use("/api", serviceRouter);
app.use("/api", tutorRouter);
app.use("/api", contactRouter);
app.use("/api", TestimonialRouter);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api', blogRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));