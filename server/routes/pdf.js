import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { generatePDF } from '../utils/pdfGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Generate and download PDF report
router.post('/generate', async (req, res) => {
  try {
    const analysisData = req.body;

    if (!analysisData || (!analysisData.prediction && !analysisData.predicted_class)) {
      return res.status(400).json({ 
        error: 'Invalid analysis data. Missing prediction information.' 
      });
    }

    // Create reports directory if it doesn't exist
    const reportsDir = path.join(__dirname, '../../reports');
    try {
      await fs.mkdir(reportsDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    // Generate unique filename
    const timestamp = Date.now();
    const disease = analysisData.prediction || analysisData.predicted_class;
    const filename = `DermAI_Report_${disease.replace(/\s/g, '_')}_${timestamp}.pdf`;
    const filepath = path.join(reportsDir, filename);

    // Generate PDF
    await generatePDF(analysisData, filepath);

    // Send file for download
    res.download(filepath, filename, async (err) => {
      if (err) {
        console.error('Error sending PDF:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to download PDF' });
        }
      }

      // Delete file after sending (cleanup)
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