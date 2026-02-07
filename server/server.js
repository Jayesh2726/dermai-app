require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Flask API Configuration
const FLASK_API_URL = process.env.FLASK_API_URL || 'https://monkeypox-disease-detection-production.up.railway.app';

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', message: 'DermAI server is running' });
});

// Proxy to Flask API for predictions
app.post('/api/predict', async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('file', req.body.file);

    const response = await axios.post(`${FLASK_API_URL}/api/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Prediction error:', error.message);
    res.status(500).json({ 
      error: 'Failed to get prediction', 
      details: error.message 
    });
  }
});

// Get Flask API info
app.get('/api/info', async (req, res) => {
  try {
    const response = await axios.get(`${FLASK_API_URL}/api/info`);
    res.json(response.data);
  } catch (error) {
    console.error('Info error:', error.message);
    res.status(500).json({ 
      error: 'Failed to get API info', 
      details: error.message 
    });
  }
});

// Get available classes
app.get('/api/classes', async (req, res) => {
  try {
    const response = await axios.get(`${FLASK_API_URL}/api/classes`);
    res.json(response.data);
  } catch (error) {
    console.error('Classes error:', error.message);
    res.status(500).json({ 
      error: 'Failed to get classes', 
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Flask API: ${FLASK_API_URL}`);
});
