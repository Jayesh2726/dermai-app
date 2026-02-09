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

// =======================
// App & Config
// =======================
const app = express();
const PORT = process.env.PORT || 5000;

const FLASK_API_URL =
  process.env.FLASK_API_URL ||
  "https://monkeypox-disease-detection-production.up.railway.app";

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// multer for image upload
const upload = multer();

// =======================
// Gemini Client
// =======================
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY not found in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("✅ Gemini API key loaded");

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
// 🔥 Gemini Chatbot API (FIXED)
// =======================
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const result = await model.generateContent(`
You are a medical assistant chatbot for DermAI.
Follow medical safety rules.
If unsure, advise consulting a doctor.

User question:
${message}
    `);

    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// =======================
// Proxy → Flask (Prediction)
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
        `${FLASK_API_URL}/api/predict`,
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
// Flask API Info
// =======================
app.get("/api/info", async (req, res) => {
  try {
    const response = await axios.get(`${FLASK_API_URL}/api/info`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =======================
// Flask Classes
// =======================
app.get("/api/classes", async (req, res) => {
  try {
    const response = await axios.get(
      `${FLASK_API_URL}/api/classes`
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
  console.log(`📡 Flask API → ${FLASK_API_URL}`);
});
