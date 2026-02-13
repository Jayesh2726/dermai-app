import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Learn.css';

const diseases = [
  {
    id: 'chickenpox',
    name: 'Chickenpox',
    icon: '🦠',
    description: 'A highly contagious viral infection causing itchy rash with blisters.',
    link: 'https://www.cdc.gov/chickenpox/about/index.html', // 🔗 Add official link here
    symptoms: [
      'Itchy rash with fluid-filled blisters',
      'Fever (usually mild)',
      'Tiredness and fatigue',
      'Loss of appetite',
      'Headache'
    ],
    treatment: [
      'Rest and plenty of fluids',
      'Calamine lotion for itching',
      'Antihistamines',
      'Acetaminophen for fever',
      'Keep fingernails short'
    ]
  },
  {
    id: 'measles',
    name: 'Measles',
    icon: '🌡️',
    description: 'A highly contagious viral disease with fever and red rash.',
    link: 'https://www.who.int/news-room/fact-sheets/detail/measles', // 🔗 Add official link here
    symptoms: [
      'High fever (104°F)',
      'Cough and runny nose',
      'Red, watery eyes',
      'White spots in mouth',
      'Red blotchy rash'
    ],
    treatment: [
      'Rest and supportive care',
      'Fever reducers',
      'Plenty of fluids',
      'Vitamin A supplementation',
      'Medical monitoring'
    ]
  },
  {
    id: 'monkeypox',
    name: 'Monkeypox',
    icon: '🔬',
    description: 'A viral disease with symptoms similar to smallpox.',
    link: 'https://www.who.int/news-room/fact-sheets/detail/mpox', // 🔗 Add official link here
    symptoms: [
      'Fever and chills',
      'Headache and muscle aches',
      'Swollen lymph nodes',
      'Progressive rash',
      'Fatigue',
      'Respiratory symptoms'
    ],
    treatment: [
      'Supportive care',
      'Pain management',
      'Antiviral medications',
      'Isolation',
      'Wound care',
      'Medical monitoring'
    ]
  },
  {
    id: 'normal',
    name: 'Healthy Skin',
    icon: '✨',
    description: 'Characteristics of normal, healthy skin.',
    link: 'https://www.who.int/news-room/fact-sheets/detail/mpox', // 🔗 Add official link here
    symptoms: [
      'Even skin tone',
      'Proper moisture balance',
      'No unusual lesions',
      'Quick wound healing',
      'Minimal sensitivity'
    ],
    treatment: [
      'Daily gentle cleansing',
      'Regular moisturizing',
      'Sun protection (SPF 30+)',
      'Adequate hydration',
      'Balanced diet',
      'Healthy lifestyle'
    ]
  }
];

const Learn = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedDisease) {
    const disease = diseases.find(d => d.id === selectedDisease);

    return (
      <div className="learn-page">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="disease-detail"
          >
            <button
              className="btn btn-secondary mb-3"
              onClick={() => setSelectedDisease(null)}
            >
              ← Back to Library
            </button>

            <div className="detail-header card">
              <div className="detail-icon">{disease.icon}</div>
              <h1>{disease.name}</h1>
              <p className="text-muted">{disease.description}</p>
            </div>

            {/* Symptoms & Treatment */}
            <div className="grid grid-2 mt-3">
              <div className="detail-section card">
                <h2>Symptoms</h2>
                <ul className="detail-list">
                  {disease.symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-section card">
                <h2>Treatment</h2>
                <ul className="detail-list">
                  {disease.treatment.map((treatment, index) => (
                    <li key={index}>{treatment}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 🔗 Official Link Button (Only if link exists) */}
            {disease.link && (
              <div className="text-center mt-3">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={disease.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  🔗 Read More / Official Information
                </motion.a>
              </div>
            )}

            {/* Reminder */}
            <div className="disclaimer-card card mt-3">
              <h3>⚠️ Important Reminder</h3>
              <p>
                This information is for educational purposes only. Always consult
                with a qualified healthcare provider for medical advice, diagnosis,
                or treatment.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="learn-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="learn-header"
        >
          <h1>Disease Library</h1>
          <p className="text-muted">
            Learn about different skin conditions and their characteristics
          </p>
        </motion.div>

        <div className="search-section">
          <input
            type="text"
            className="input"
            placeholder="Search diseases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-3 mt-4">
          {filteredDiseases.map((disease, index) => (
            <motion.div
              key={disease.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="disease-card card"
              onClick={() => setSelectedDisease(disease.id)}
            >
              <div className="disease-card-icon">{disease.icon}</div>
              <h3>{disease.name}</h3>
              <p className="text-muted">{disease.description}</p>
              <button className="btn btn-primary mt-2">
                Learn More →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;
