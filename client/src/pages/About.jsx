import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="about-header"
        >
          <h1>About DermAI</h1>
          <p className="text-muted">
            Leveraging AI to make skin disease detection accessible to everyone
          </p>
        </motion.div>

        <div className="grid grid-2 mt-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="about-card card"
          >
            <h2>Our Mission</h2>
            <p>
              DermAI aims to democratize access to preliminary skin disease detection
              using state-of-the-art machine learning technology. We believe that
              everyone deserves quick, accessible insights into their health concerns.
            </p>
            <p className="mt-2">
              Our AI model is trained on thousands of dermatological images to
              identify common skin conditions including Chickenpox, Measles,
              Monkeypox, and differentiate them from normal skin.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="about-card card"
          >
            <h2>How It Works</h2>
            <p>
              Our platform uses a deep learning model deployed on Railway that
              analyzes uploaded skin images. The model processes the image through
              multiple neural network layers to identify patterns associated with
              different skin conditions.
            </p>
            <p className="mt-2">
              The system returns confidence scores for each possible diagnosis,
              helping users understand the likelihood of different conditions.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="features-grid mt-4"
        >
          <div className="feature-item card">
            <div className="feature-icon">🔒</div>
            <h3>Privacy First</h3>
            <p className="text-muted">
              Images are processed securely and not stored permanently
            </p>
          </div>

          <div className="feature-item card">
            <div className="feature-icon">⚡</div>
            <h3>Fast & Accurate</h3>
            <p className="text-muted">
              Get results in seconds with high accuracy rates
            </p>
          </div>

          <div className="feature-item card">
            <div className="feature-icon">📱</div>
            <h3>Easy to Use</h3>
            <p className="text-muted">
              Simple interface accessible from any device
            </p>
          </div>

          <div className="feature-item card">
            <div className="feature-icon">🌍</div>
            <h3>Accessible</h3>
            <p className="text-muted">
              Available 24/7 from anywhere in the world
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="disclaimer-section card mt-4"
        >
          <h2>⚠️ Important Disclaimer</h2>
          <p>
            DermAI is an educational tool and should NOT be used as a substitute
            for professional medical advice, diagnosis, or treatment. Always
            seek the advice of your physician or other qualified healthcare
            provider with any questions you may have regarding a medical condition.
          </p>
          <p className="mt-2">
            If you suspect you have a serious skin condition or are experiencing
            severe symptoms, please seek immediate medical attention.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="tech-section card mt-4"
        >
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <strong>Frontend:</strong> React + Vite + Framer Motion
            </div>
            <div className="tech-item">
              <strong>Backend:</strong> Node.js + Express
            </div>
            <div className="tech-item">
              <strong>AI Model:</strong> Flask API on Railway
            </div>
            <div className="tech-item">
              <strong>Database:</strong> MongoDB (optional)
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
