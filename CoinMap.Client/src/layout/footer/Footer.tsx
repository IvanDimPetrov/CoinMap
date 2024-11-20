import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 CoinMap. All rights reserved.</p>
        <nav className="footer-nav">
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Terms of Service</Link>
          <Link to="/contact" className="footer-link">Contact Us</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
