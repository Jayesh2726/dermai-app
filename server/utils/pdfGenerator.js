import PDFDocument from 'pdfkit';
import fs from 'fs';

/* ---------------------- Disease Information ---------------------- */

const diseaseInfo = {
  Chickenpox: {
    description: 'A highly contagious viral infection causing an itchy rash with fluid-filled blisters.',
    learnMoreUrl: '/learn#chickenpox',
    color: '#3B82F6',
    precautions: [
      'Avoid scratching blisters to prevent infection.',
      'Stay isolated until all blisters have crusted.',
      'Drink plenty of fluids and take adequate rest.',
      'Use soothing lotions like calamine for itching.',
      'Consult a doctor if fever becomes severe.'
    ]
  },
  Measles: {
    description: 'A serious viral infection with fever and characteristic red rash.',
    learnMoreUrl: '/learn#measles',
    color: '#EF4444',
    precautions: [
      'Stay isolated to prevent spreading the virus.',
      'Get plenty of rest and drink fluids.',
      'Take fever-reducing medicines as prescribed.',
      'Avoid bright light if eyes are sensitive.',
      'Seek medical help if breathing issues occur.'
    ]
  },
  Monkeypox: {
    description: 'A viral disease with symptoms similar to smallpox, though typically less severe.',
    learnMoreUrl: '/learn#monkeypox',
    color: '#8B5CF6',
    precautions: [
      'Avoid close contact with infected individuals.',
      'Do not touch rash or skin lesions.',
      'Wash hands frequently with soap.',
      'Wear protective clothing if required.',
      'Consult a healthcare provider immediately.'
    ]
  },
  Normal: {
    description: 'Healthy skin with no signs of the diseases analyzed by our system.',
    learnMoreUrl: '/learn#normal',
    color: '#10B981',
    precautions: [
      'Maintain a regular skincare routine.',
      'Use sunscreen daily.',
      'Stay hydrated and eat balanced diet.',
      'Avoid excessive sun exposure.',
      'Visit dermatologist for routine check-ups.'
    ]
  }
};

/* ---------------------- Helper Functions ---------------------- */

function formatConfidence(conf) {
  if (conf === undefined || conf === null) return 'N/A';
  const str = String(conf).replace('%', '');
  const num = parseFloat(str);
  if (isNaN(num)) return 'N/A';
  return num > 1 ? num.toFixed(1) : (num * 100).toFixed(1);
}

/* ---------------------- PDF Generator ---------------------- */

export const generatePDF = async (analysisData, outputPath, imageBuffer = null) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ 
        margin: 50, 
        size: 'A4',
        bufferPages: true  // Important: buffer all pages
      });
      
      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      const disease = analysisData.prediction || analysisData.predicted_class || 'Unknown';
      const confidenceValue = formatConfidence(analysisData.confidence);
      const details = diseaseInfo[disease] || diseaseInfo.Normal;

      // ============ PAGE 1: REPORT ============

      // Header
      doc.fontSize(24).fillColor('#2563EB').text('DermAI Analysis Report', { align: 'center' });
      doc.fontSize(10).fillColor('#6B7280').text(`Generated on ${new Date().toLocaleString()}`, { align: 'center' });
      doc.moveDown(0.5);
      doc.strokeColor('#E5E7EB').lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(1);

      // Prediction Box
      let y = doc.y;
      doc.roundedRect(50, y, 495, 100, 10).fillAndStroke(details.color + '15', details.color);
      doc.fontSize(16).fillColor(details.color).text('Predicted Condition', 70, y + 10);
      doc.fontSize(24).fillColor('#1F2937').text(disease, 70, y + 35);
      doc.fontSize(12).fillColor('#6B7280').text(`Confidence: ${confidenceValue}%`, 70, y + 65);
      doc.y = y + 110;

      // Description
      doc.fontSize(12).fillColor('#374151').font('Helvetica-Bold').text('About this condition:');
      doc.fontSize(10).fillColor('#6B7280').font('Helvetica').text(details.description, { align: 'justify' });
      doc.moveDown(1);

      // Detailed Predictions
      if (analysisData.all_predictions && Object.keys(analysisData.all_predictions).length > 0) {
        doc.fontSize(12).fillColor('#1F2937').font('Helvetica-Bold').text('Detailed Predictions:');
        doc.moveDown(0.5);

        const sorted = Object.entries(analysisData.all_predictions).sort(([, a], [, b]) => b - a);
        sorted.forEach(([className, conf]) => {
          const percent = formatConfidence(conf);
          const isTop = className === disease;
          y = doc.y;

          doc.fontSize(10).fillColor(isTop ? details.color : '#374151').font(isTop ? 'Helvetica-Bold' : 'Helvetica').text(className, 70, y);
          doc.rect(250, y - 2, 250, 12).fillAndStroke('#F3F4F6', '#E5E7EB');
          const barWidth = (Math.min(parseFloat(percent), 100) / 100) * 250;
          doc.rect(250, y - 2, barWidth, 12).fill(isTop ? details.color : '#9CA3AF');
          doc.fontSize(9).fillColor('#374151').font('Helvetica').text(`${percent}%`, 510, y);
          doc.y = y + 18;
        });
        doc.moveDown(0.5);
      }

      // Precautions
      doc.fontSize(12).fillColor('#1F2937').font('Helvetica-Bold').text('Recommended Precautions:');
      doc.fontSize(10).fillColor('#374151').font('Helvetica');
      details.precautions.forEach(p => {
        doc.text(`• ${p}`, { indent: 15, lineGap: 2 });
      });
      doc.moveDown(1);

      // Disclaimer
      doc.fontSize(9).fillColor('#DC2626').font('Helvetica-Bold').text('⚠️ IMPORTANT MEDICAL DISCLAIMER', { align: 'center' });
      doc.fontSize(8).fillColor('#374151').font('Helvetica').text(
        'This analysis is for educational purposes only and does not constitute a medical diagnosis. Always consult a qualified healthcare provider.',
        { align: 'justify', lineGap: 2 }
      );
      doc.moveDown(0.8);

      // Learn More Box
      const url = `https://dermai.app${details.learnMoreUrl || ''}`;
      y = doc.y;
      doc.roundedRect(50, y, 495, 50, 10).fillAndStroke('#DBEAFE', '#3B82F6');
      doc.fontSize(10).fillColor('#1E40AF').font('Helvetica-Bold').text(`Learn More About ${disease}`, 70, y + 10);
      doc.fontSize(7).fillColor('#1E40AF').font('Helvetica').text(url, 70, y + 28);

      // ============ PAGE 2: IMAGE ============

      if (imageBuffer) {
        doc.addPage();

        doc.fontSize(18).fillColor('#2563EB').text('Uploaded Image', { align: 'center' });
        doc.moveDown(1);

        try {
          const img = doc.openImage(imageBuffer);
          const maxWidth = doc.page.width - 100;
          const maxHeight = doc.page.height - 150;
          const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
          const w = img.width * scale;
          const h = img.height * scale;
          const x = (doc.page.width - w) / 2;

          doc.image(imageBuffer, x, doc.y, { width: w, height: h });
        } catch (err) {
          doc.fontSize(11).fillColor('#DC2626').text('Image could not be displayed.', { align: 'center' });
        }
      }

      // ============ ADD FOOTERS TO ALL PAGES ============

      const range = doc.bufferedPageRange();
      for (let i = 0; i < range.count; i++) {
        doc.switchToPage(i);
        doc.fontSize(7).fillColor('#9CA3AF').text(
          'DermAI - AI-Powered Skin Disease Detection | www.dermai.app',
          50,
          doc.page.height - 30,
          { align: 'center', lineBreak: false }
        );
      }

      doc.end();
      stream.on('finish', () => resolve(outputPath));
      stream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
};

export { diseaseInfo };