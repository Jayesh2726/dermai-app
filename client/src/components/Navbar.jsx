import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🔬</span>
            <span className="logo-text">DermAI</span>
          </Link>
          
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/analyze" className="nav-link">Analyze</Link>
            <Link to="/learn" className="nav-link">Learn</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
