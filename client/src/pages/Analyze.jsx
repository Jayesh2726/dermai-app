import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ResultsActions from '../components/ResultsActions';
import Chatbot from '../components/Chatbot';
import './Analyze.css';

const FLASK_API_URL = 'https://monkeypox-disease-detection-production.up.railway.app';

const Analyze = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', image);

      const response = await fetch(`${FLASK_API_URL}/api/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      const transformedResult = {
        prediction:
          typeof data.prediction === 'object'
            ? data.prediction.predicted_class
            : data.predicted_class || data.prediction || 'Unknown',
        confidence:
          typeof data.prediction === 'object'
            ? data.prediction.confidence
            : data.confidence ?? 0,
        all_predictions: data.all_predictions || {},
      };

      setResult(transformedResult);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="analyze-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="analyze-header"
        >
          <h1>Skin Analysis</h1>
          <p className="text-muted">Upload an image for AI-powered analysis</p>
        </motion.div>

        {!preview ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="upload-section card">
            <div
              className="upload-zone"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <div className="upload-icon">📷</div>
              <h3>Upload Skin Image</h3>
              <p className="text-muted">Drag and drop an image here, or click to browse</p>
              <input type="file" id="fileInput" accept="image/*" onChange={handleImageChange} />
              <button className="btn btn-primary mt-2">Choose File</button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="analysis-section">
            <div className="grid grid-2">
              <div className="preview-card card">
                <h3 className="mb-2">Your Image</h3>
                <img src={preview} alt="Preview" className="preview-image" />
                <div className="preview-actions mt-2">
                  <button className="btn btn-secondary" onClick={resetAnalysis}>Upload New</button>
                  {!result && (
                    <button className="btn btn-primary" onClick={analyzeImage} disabled={loading}>
                      {loading ? 'Analyzing...' : '🔍 Analyze'}
                    </button>
                  )}
                </div>
                {error && <p className="text-error mt-2">{error}</p>}
              </div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="results-card card"
                >
                  <h3 className="mb-2">Analysis Results</h3>

                  <div className="prediction-result">
                    <div className="prediction-label">{result.prediction}</div>
                    <div className="confidence-score">
                      {(result.confidence * 100).toFixed(1)}% Confidence
                    </div>
                  </div>

                  <div className="all-predictions mt-3">
                    <h4 className="mb-2">All Predictions</h4>
                    {result.all_predictions && Object.keys(result.all_predictions).length > 0 ? (
                      Object.entries(result.all_predictions)
                        .sort(([, a], [, b]) => b - a)
                        .map(([className, confidence]) => (
                          <div key={className} className="confidence-item">
                            <div className="confidence-label-row">
                              <span>{className}</span>
                              <span>{(confidence * 100).toFixed(1)}%</span>
                            </div>
                            <div className="confidence-bar">
                              <div
                                className="confidence-fill"
                                style={{ width: `${confidence * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className="text-muted">No detailed predictions available</p>
                    )}
                  </div>

                  <ResultsActions result={result} imageFile={image} />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* ✅ Chatbot only on Analyze page - gets prediction context */}
      <Chatbot predictionResult={result} />
    </div>
  );
};

export default Analyze;