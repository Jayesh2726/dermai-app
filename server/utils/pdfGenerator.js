import PDFDocument from 'pdfkit';
import fs from 'fs';

// Precautions Information for PDF


// Disease information for PDF
const diseaseInfo = {
  Chickenpox: {
    description:
      'A highly contagious viral infection causing an itchy rash with fluid-filled blisters.',
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
    description:
      'A serious viral infection with fever and characteristic red rash.',
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
    description:
      'A viral disease with symptoms similar to smallpox, though typically less severe.',
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
    description:
      'Healthy skin with no signs of the diseases analyzed by our system.',
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

export const generatePDF = async (analysisData, outputPath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const stream = fs.createWriteStream(outputPath);
      
      doc.pipe(stream);

      // Header
      doc.fontSize(24)
         .fillColor('#2563EB')
         .text('DermAI Analysis Report', { align: 'center' });
      
      doc.moveDown(0.5);
      doc.fontSize(10)
         .fillColor('#6B7280')
         .text(`Generated on ${new Date().toLocaleString()}`, { align: 'center' });

      // Horizontal line
      doc.moveDown(1);
      doc.strokeColor('#E5E7EB')
         .lineWidth(1)
         .moveTo(50, doc.y)
         .lineTo(545, doc.y)
         .stroke();

      doc.moveDown(2);

      // Prediction Result Box
      const disease = analysisData.prediction || analysisData.predicted_class;
      const confidence = analysisData.confidence * 100;
      const diseaseDetails = diseaseInfo[disease] || diseaseInfo['Normal'];

      doc.roundedRect(50, doc.y, 495, 120, 10)
         .fillAndStroke(diseaseDetails.color + '15', diseaseDetails.color);

      doc.moveDown(1);
      doc.fontSize(18)
         .fillColor(diseaseDetails.color)
         .text('Predicted Condition', 70, doc.y + 10);

      doc.fontSize(28)
         .fillColor('#1F2937')
         .text(disease, 70, doc.y + 15);

      doc.fontSize(14)
         .fillColor('#6B7280')
         .text(`Confidence: ${confidence.toFixed(1)}%`, 70, doc.y + 10);

      doc.moveDown(4);

      // Description
      doc.fontSize(12)
         .fillColor('#374151')
         .text('About this condition:', { underline: true });
      
      doc.moveDown(0.5);
      doc.fontSize(11)
         .fillColor('#6B7280')
         .text(diseaseDetails.description, { align: 'justify' });

      doc.moveDown(2);

      // All Predictions Table
      doc.fontSize(14)
         .fillColor('#1F2937')
         .text('Detailed Predictions:', { underline: true });

      doc.moveDown(1);

      const predictions = analysisData.all_predictions || {};
      const sortedPredictions = Object.entries(predictions)
        .sort(([, a], [, b]) => b - a);

      let tableY = doc.y;

      sortedPredictions.forEach(([className, conf]) => {
        const percentage = (conf * 100).toFixed(1);
        const isTopPrediction = className === disease;

        // Class name
        doc.fontSize(11)
           .fillColor(isTopPrediction ? diseaseDetails.color : '#374151')
           .font(isTopPrediction ? 'Helvetica-Bold' : 'Helvetica')
           .text(className, 70, tableY);

        // Confidence bar background
        doc.rect(250, tableY - 2, 250, 14)
           .fillAndStroke('#F3F4F6', '#E5E7EB');

        // Confidence bar fill
        const barWidth = (percentage / 100) * 250;
        doc.rect(250, tableY - 2, barWidth, 14)
           .fill(isTopPrediction ? diseaseDetails.color : '#9CA3AF');

        // Percentage text
        doc.fontSize(10)
           .fillColor('#374151')
           .font('Helvetica')
           .text(`${percentage}%`, 510, tableY);

        tableY += 25;
      });

      doc.moveDown(2);

      // Precautions Section
         doc.fontSize(14)
            .fillColor('#1F2937')
            .font('Helvetica-Bold')
            .text('Recommended Precautions:', { underline: true });

         doc.moveDown(0.5);

         doc.fontSize(11)
            .fillColor('#374151')
            .font('Helvetica');

         (diseaseDetails.precautions || []).forEach((item) => {
         doc.text(`• ${item}`, {
            indent: 20,
            lineGap: 4
         });
         });

         doc.moveDown(2);

      doc.moveDown(3);

      // Important Notice
      doc.fontSize(10)
         .fillColor('#DC2626')
         .font('Helvetica-Bold')
         .text('WARNING: IMPORTANT MEDICAL DISCLAIMER', { align: 'center' });

      doc.moveDown(0.5);
      doc.fontSize(9)
         .fillColor('#374151')
         .font('Helvetica')
         .text(
           'This analysis is for EDUCATIONAL PURPOSES ONLY and does NOT constitute a medical diagnosis. ' +
           'The AI provides probability estimates based on visual patterns but cannot replace professional ' +
           'medical examination. Always consult with a qualified healthcare provider for accurate diagnosis ' +
           'and treatment. If you have serious health concerns, seek immediate medical attention.',
           { align: 'justify', lineGap: 3 }
         );

      doc.moveDown(2);

      // Next Steps
      doc.fontSize(12)
         .fillColor('#1F2937')
         .font('Helvetica-Bold')
         .text('Recommended Next Steps:');

      doc.moveDown(0.5);
      doc.fontSize(10)
         .fillColor('#374151')
         .font('Helvetica')
         .list([
           'Consult a qualified dermatologist or healthcare provider',
           'Bring this report to your medical appointment',
           'Do not self-diagnose or self-medicate based on this analysis',
           'Monitor any changes in symptoms',
           'Seek immediate care if symptoms worsen or become severe'
         ], 70, doc.y, { bulletRadius: 2, textIndent: 20, lineGap: 5 });

      doc.moveDown(2);

      // Learn More Section
      doc.roundedRect(50, doc.y, 495, 60, 10)
         .fillAndStroke('#DBEAFE', '#3B82F6');

      doc.moveDown(0.5);
      doc.fontSize(11)
         .fillColor('#1E40AF')
         .font('Helvetica-Bold')
         .text('Learn More About ' + disease, 70, doc.y + 5);

      doc.fontSize(9)
         .fillColor('#1E40AF')
         .font('Helvetica')
         .text('Visit our educational library: https://dermai.app' + diseaseDetails.learnMoreUrl, 
               70, doc.y + 8);

      // Footer
      doc.fontSize(8)
         .fillColor('#9CA3AF')
         .text(
           'DermAI - AI-Powered Skin Disease Detection | www.dermai.app',
           50,
           750,
           { align: 'center' }
         );

      doc.end();

      stream.on('finish', () => {
        resolve(outputPath);
      });

      stream.on('error', (error) => {
        reject(error);
      });

    } catch (error) {
      reject(error);
    }
  });
};

export { diseaseInfo };