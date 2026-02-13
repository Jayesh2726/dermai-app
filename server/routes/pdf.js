import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { generatePDF } from '../utils/pdfGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configure multer for handling image uploads in memory
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Generate and download PDF report
router.post('/generate', upload.single('image'), async (req, res) => {
  try {
    // Parse the analysis data from form fields
    const prediction = req.body.prediction;
    const confidence = parseFloat(req.body.confidence);
    const all_predictions = req.body.all_predictions 
      ? JSON.parse(req.body.all_predictions) 
      : {};

    if (!prediction) {
      return res.status(400).json({
        error: 'Invalid analysis data. Missing prediction information.'
      });
    }

    const analysisData = {
      prediction,
      confidence,
      all_predictions
    };

    // Get image buffer if provided
    const imageBuffer = req.file ? req.file.buffer : null;

    // Create reports directory if it doesn't exist
    const reportsDir = path.join(__dirname, '../../reports');
    await fs.mkdir(reportsDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const safeDisease = prediction.replace(/\s/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    const filename = `DermAI_Report_${safeDisease}_${timestamp}.pdf`;
    const filepath = path.join(reportsDir, filename);

    // Generate PDF with image
    await generatePDF(analysisData, filepath, imageBuffer);

    // Send file for download
    res.download(filepath, filename, async (err) => {
      if (err) {
        console.error('Error sending PDF:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to download PDF' });
        }
      }

      // Cleanup temporary PDF file after sending
      try {
        await fs.unlink(filepath);
      } catch (unlinkErr) {
        console.error('Error deleting temporary PDF:', unlinkErr);
      }
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({
      error: 'Failed to generate PDF report',
      details: error.message
    });
  }
});

export default router;