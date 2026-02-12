import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultsActions.css';

const ResultsActions = ({ result }) => {
  const navigate = useNavigate();
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  const diseaseLinks = {
    'Chickenpox': '#chickenpox',
    'Measles': '#measles',
    'Monkeypox': '#monkeypox',
    'Normal': '#normal'
  };

  const downloadPDF = async () => {
    if (!result) return;

    setDownloadingPDF(true);

    try {
      const response = await fetch('http://localhost:5000/api/pdf/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Get the PDF blob
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `DermAI_Report_${result.prediction.replace(/\s/g, '_')}_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error('PDF download error:', err);
      alert('Failed to download PDF report. Please try again.');
    } finally {
      setDownloadingPDF(false);
    }
  };

  const learnMore = () => {
    if (result && result.prediction) {
      const anchor = diseaseLinks[result.prediction] || '#';
      navigate('/learn' + anchor);
    }
  };

  return (
    <div className="results-actions-container">
      <div className="action-buttons-grid">
        <button 
          className="action-btn primary-btn"
          onClick={downloadPDF}
          disabled={downloadingPDF}
        >
          {downloadingPDF ? (
            <>
              <div className="btn-spinner"></div>
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <span className="btn-icon">📄</span>
              <span>Download Report</span>
            </>
          )}
        </button>

        <button 
          className="action-btn secondary-btn" 
          onClick={learnMore}
        >
          <span className="btn-icon">📚</span>
          <span>Learn More</span>
        </button>
      </div>

      <div className="disclaimer-box">
        <p className="disclaimer-text">
          <span className="warning-icon">⚠️</span>
          This analysis is for educational purposes only and does NOT constitute 
          a medical diagnosis. Please consult a healthcare provider for proper 
          diagnosis and treatment.
        </p>
      </div>
    </div>
  );
};

export default ResultsActions;