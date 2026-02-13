import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp'; // npm install sharp
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Ensure temp directory exists (synchronous – runs once at startup)
const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Configure multer for memory storage
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type. Please upload JPEG, PNG, or WebP.'));
    }
  }
});

// POST /api/upload – store image temporarily and return imageId
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Convert image to JPEG using sharp
    let jpegBuffer;
    try {
      jpegBuffer = await sharp(req.file.buffer)
        .jpeg({ quality: 90 }) // 90% quality – good balance
        .toBuffer();
    } catch (convErr) {
      console.error('Image conversion failed:', convErr);
      return res.status(500).json({ error: 'Image processing failed' });
    }

    // Generate unique ID and save as .jpg
    const imageId = crypto.randomBytes(16).toString('hex');
    const fileName = `${imageId}.jpg`;
    const filePath = path.join(tempDir, fileName);

    await fs.promises.writeFile(filePath, jpegBuffer);

    // Schedule automatic deletion after 15 minutes
    setTimeout(async () => {
      try {
        await fs.promises.unlink(filePath);
        console.log(`Deleted temp file: ${fileName}`);
      } catch (err) {
        // Ignore if already deleted
      }
    }, 15 * 60 * 1000);

    res.json({
      imageId,
      message: 'Image uploaded and converted to JPEG',
      expiresIn: '15 minutes'
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message || 'Image upload failed' });
  }
});

export default router;