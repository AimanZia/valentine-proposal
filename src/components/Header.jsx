import React from 'react';
import { Heart, Sun, Moon } from 'lucide-react';

const Header = ({ girlName, darkMode, toggleTheme }) => (
  <header style={{ padding: '20px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
    <h1>
      Made for {girlName} with 
      <Heart fill="red" color="red" size={24} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '5px' }} />
    </h1>
    <button 
      onClick={toggleTheme} 
      style={{ position: 'absolute', right: '20px', top: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-color)' }}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  </header>
);

export default Header;