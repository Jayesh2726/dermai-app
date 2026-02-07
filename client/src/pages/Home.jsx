import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Instant Analysis',
      description: 'Get AI-powered results in seconds'
    },
    {
      icon: '🔒',
      title: '100% Private',
      description: 'Your data is secure and encrypted'
    },
    {
      icon: '🎯',
      title: 'High Accuracy',
      description: 'Trained on thousands of medical images'
    },
    {
      icon: '📚',
      title: 'Learn More',
      description: 'Access detailed disease information'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-content"
          >
            <h1 className="hero-title">
              AI-Powered Skin Disease Detection
            </h1>
            <p className="hero-subtitle">
              Get instant insights about skin conditions using advanced machine learning.
              Fast, private, and accurate analysis.
            </p>
            <div className="hero-actions">
              <Link to="/analyze" className="btn btn-primary btn-lg">
                Start Analysis
                <span>→</span>
              </Link>
              <Link to="/learn" className="btn btn-secondary btn-lg">
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-visual"
          >
            <div className="visual-circle">
              <div className="pulse"></div>
              <span className="visual-icon">🔬</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title text-center mb-4">Why Choose DermAI?</h2>
          <div className="grid grid-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="feature-card card"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p className="text-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title text-center mb-4">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Upload Image</h3>
              <p className="text-muted">Take or upload a photo of the affected area</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>AI Analysis</h3>
              <p className="text-muted">Our AI analyzes the image instantly</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get Results</h3>
              <p className="text-muted">View detailed insights and recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Ready to Get Started?</h2>
            <p>Upload your image and get instant AI-powered analysis</p>
            <Link to="/analyze" className="btn btn-primary btn-lg">
              Analyze Now
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
