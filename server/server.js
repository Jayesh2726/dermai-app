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
// const { GoogleGenerativeAI } = require("@google/generative-ai");

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

console.log("✅ GEMINI API KEY loaded");

// =======================
// Health Check
// =======================
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    message: "DermAI server is running",
  });
});

// =======================
// Proxy → Flask (Prediction)
// =======================
app.post(
  "/api/predict",
  upload.single("file"),
  async (req, res) => {
    try {
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
        error: "Failed to get prediction",
        details: error.message,
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
// 🔥 Gemini Chatbot API
// =======================
app.get("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.0-pro",
    });

    const result = await model.generateContent(`
You are a medical assistant chatbot for DermAI.
Answer clearly and safely.

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
// Global Error Handler
// =======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// =======================
// Start Server
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Flask API → ${FLASK_API_URL}`);
});
