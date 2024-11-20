import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="header-logo">CoinMap</Link>
      <nav className="header-nav">
        <Link to="/register" className="header-link header-link-login">Register</Link>
        <Link to="/login" className="header-link header-link-login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
