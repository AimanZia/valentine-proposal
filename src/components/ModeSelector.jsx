import React from 'react';
import { User, Code } from 'lucide-react';

const ModeSelector = ({ onSelectMode }) => (
  <div className="fade-in">
    <h2>In this Valentine week...</h2>
    <p>I want to ask you some questions.</p>
    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px' }}>
      <button className="btn outline-btn" onClick={() => onSelectMode('personal')}>
        <User size={18} /> Personal
      </button>
      <button className="btn outline-btn" onClick={() => onSelectMode('professional')}>
        <Code size={18} /> Professional
      </button>
    </div>
  </div>
);

export default ModeSelector;