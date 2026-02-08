import React from 'react';
import { User, Code } from 'lucide-react';
import '../styles/ModeSelector.css';

const ModeSelector = ({ onSelectMode }) => (
  <div className="mode-selector-container fade-in">
    <h2 className="mode-selector-heading">In this Valentine week...</h2>
    <p className="mode-selector-subtitle">I want to ask you some questions.</p>
    <div className="mode-selector-buttons">
      <button className="btn outline-btn mode-btn" onClick={() => onSelectMode('personal')}>
        <User size={18} /> Personal
      </button>
      <button className="btn outline-btn mode-btn" onClick={() => onSelectMode('professional')}>
        <Code size={18} /> Professional
      </button>
    </div>
  </div>
);

export default ModeSelector;