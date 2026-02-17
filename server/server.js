// =======================
// Load ENV (MUST be first)
// =======================
import dotenv from "dotenv";
dotenv.config();

// =======================
// Imports
// =======================
import express from "express";
import cors from "cors";
import axios from "axios";
import multer from "multer";
import FormData from "form-data";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdfRouter from "./routes/pdf.js";
// import chatRouter from "./routes/chat.js";
import uploadRouter from "./routes/upload.js"; // NEW

// =======================
// App & Config
// =======================
const app = express();
const PORT = process.env.PORT || 5000;

const Fast_API_URL =
  process.env.Fast_API_URL ||
  "https://monkeypox-disease-detection-production.up.railway.app";

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/pdf", pdfRouter);
// app.use("/api/chat", chatRouter);
app.use("/api/upload", uploadRouter); // NEW

// multer for image upload
const upload = multer();

// =======================
// Gemini Client (used by chatRouter, kept here for proxy)
// =======================
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY not found in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);
console.log("✅ OpenAI API key loaded");

// =======================
// Health Check
// =======================
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    message: "DermAI server running 🚀",
  });
});

// =======================
// Proxy → Fast (Prediction)
// =======================
app.post(
  "/api/predict",
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "Image file required",
        });
      }

      const formData = new FormData();
      formData.append(
        "file",
        req.file.buffer,
        req.file.originalname
      );

      const response = await axios.post(
        `${Fast_API_URL}/api/predict`,
        formData,
        { headers: formData.getHeaders() }
      );

      res.json(response.data);
    } catch (error) {
      console.error("Prediction error:", error.message);
      res.status(500).json({
        error: "Prediction failed",
      });
    }
  }
);

// =======================
// Fast API Info
// =======================
app.get("/api/info", async (req, res) => {
  try {
    const response = await axios.get(`${Fast_API_URL}/api/info`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =======================
// Fast Classes
// =======================
app.get("/api/classes", async (req, res) => {
  try {
    const response = await axios.get(
      `${Fast_API_URL}/api/classes`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =======================
// Global Error Handler
// =======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// =======================
// Start Server
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Fast API → ${Fast_API_URL}`);
});