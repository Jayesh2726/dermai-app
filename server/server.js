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
import OpenAI from "openai";
import multer from "multer";
import FormData from "form-data";

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
// OpenAI Client
// =======================
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY not found in .env");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("✅ OPENAI KEY loaded");

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
// 🔥 Chatbot Test API (LLM)
// =======================
app.get("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `You are a medical assistant chatbot.
User: ${message}`,
    });

    res.json({
      reply: response.output_text,
    });
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
