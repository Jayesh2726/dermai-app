import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Learn from './pages/Learn';
import About from './pages/About';
import './styles/App.css';
// ❌ Remove: import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        {/* ❌ Removed global <Chatbot /> — now lives in Analyze.jsx only */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <footer className="footer">
          <div className="container">
            <p className="text-center text-muted">
              © 2026 DermAI. Educational purposes only. Not a substitute for medical advice.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
