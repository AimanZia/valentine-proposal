import React from 'react';
import { Heart, Sun, Moon, Sparkles } from 'lucide-react';
import '../styles/Header.css';

const Header = ({ girlName, darkMode, toggleTheme }) => (
  <header className="glass-header">
    <div className="header-container">
      <div className="header-content">
        <div className="header-text-wrapper">
          <Sparkles className="sparkle-icon left-sparkle" size={20} />
          <h1 className="header-title">
            Made for <span className="girl-name">{girlName}</span> with
            <Heart className="heart-icon" fill="currentColor" />
          </h1>
          <Sparkles className="sparkle-icon right-sparkle" size={20} />
        </div>
        <p className="header-subtitle">A Special Valentine Experience</p>
      </div>

      <button 
        onClick={toggleTheme}
        className="theme-toggle-btn"
        aria-label="Toggle theme"
      >
        <div className="theme-icon-wrapper">
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </div>
      </button>
    </div>
    <div className="header-gradient-line"></div>
  </header>
);

export default Header;