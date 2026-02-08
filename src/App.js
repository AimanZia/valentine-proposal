import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import './styles/PApp.css'; // Import the CSS
import { CONFIG, QUESTION_DATA } from './config/constants';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import QuestionCard from './components/QuestionCard';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState(null); 
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [accepted, setAccepted] = useState(false);
  
  // No Button Logic State
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({ top: 'auto', left: 'auto', position: 'static' });
  const [popupMessage, setPopupMessage] = useState("");

  // Inside src/App.jsx

useEffect(() => {
  const root = document.documentElement;
  // Select the theme object
  const theme = darkMode ? CONFIG.colors.dark : CONFIG.colors.light;

  // --- EXPLICIT MAPPING (No Magic) ---
  // Left side: The CSS Variable name (must match App.css)
  // Right side: The value from your Config file
  
  root.style.setProperty('--bg-gradient', theme.bgGradient);
  root.style.setProperty('--text-color', theme.textColor);
  root.style.setProperty('--glass-heart', theme.glassHeart);
  root.style.setProperty('--glass-border', theme.glassBorder);
  root.style.setProperty('--primary-color', theme.primaryColor);
  root.style.setProperty('--shadow-color', theme.shadowColor);
  
}, [darkMode]);

  const resetState = () => {
    setShowHint(false);
    setPopupMessage("");
    setShowNextBtn(false);
    setNoBtnPosition({ top: 'auto', left: 'auto', position: 'static' });
  };

  const handleNoInteraction = () => {
    // Defines the "Safe Zones" where the button can go without overlapping the card
    // The Heart Wrapper is 600x600px. The Card is in the center.
    // We use percentages to keep it responsive.
    
    const safeZones = [
      // ZONE 1: TOP (Above the card)
      // Top: 5-15%, Left: Random across width
      { topMin: 5, topMax: 15, leftMin: 20, leftMax: 80 },
      
      // ZONE 2: LEFT (To the left of the card)
      // Top: Centered vertically, Left: 5-20%
      { topMin: 30, topMax: 70, leftMin: 5, leftMax: 20 },
      
      // ZONE 3: RIGHT (To the right of the card)
      // Top: Centered vertically, Left: 80-90%
      { topMin: 30, topMax: 70, leftMin: 80, leftMax: 90 }
    ];

    // 1. Pick a random zone
    const randomZone = safeZones[Math.floor(Math.random() * safeZones.length)];

    // 2. Generate random coordinates within that specific zone
    const randomTop = Math.floor(Math.random() * (randomZone.topMax - randomZone.topMin + 1)) + randomZone.topMin;
    const randomLeft = Math.floor(Math.random() * (randomZone.leftMax - randomZone.leftMin + 1)) + randomZone.leftMin;

    setNoBtnPosition({ 
      position: 'absolute', 
      top: `${randomTop}%`, 
      left: `${randomLeft}%` 
    });
    
    setPopupMessage("You can't catch me! 😜");
    setShowNextBtn(true);
  };

  const handleNextQuestion = () => {
    const questions = QUESTION_DATA[mode];
    const nextIndex = currentQIndex + 1;

    // 1. Reset the UI (Hide hints, put "No" button back in place)
    resetState();

    if (nextIndex < questions.length) {
      // Normal Flow: Just go to the next question
      setCurrentQIndex(nextIndex);
    } else {
      // End of list reached: Loop back to the start (Index 0)
      setCurrentQIndex(0);
      
      // Show the specific message you asked for
      // We set this AFTER resetState() so it doesn't get cleared
      setPopupMessage("Try again... 🥺 I want you to be with me! 💖🌹✨");
    }
  };

  return (
    <div className="app-container">
      <Header 
        girlName={CONFIG.girlName} 
        darkMode={darkMode} 
        toggleTheme={() => setDarkMode(!darkMode)} 
      />

      <main className="main-area">
        <div className="heart-wrapper">
          {/* SVG Background */}
          <svg viewBox="0 0 512 512" className="heart-svg">
             <path 
               d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
               fill="var(--glass-heart)"
               stroke="var(--glass-border)"
               strokeWidth="10"
             />
          </svg>

          {/* Content Area */}
          <div className="content-box">
            {!mode && <ModeSelector onSelectMode={(m) => { setMode(m); resetState(); }} />}

            {mode && !accepted && (
              <QuestionCard 
                questionData={QUESTION_DATA[mode][currentQIndex]}
                mode={mode}
                showHint={showHint}
                toggleHint={() => setShowHint(true)}
                onYes={() => setAccepted(true)}
                onNoHover={handleNoInteraction}
                noBtnPosition={noBtnPosition}
                popupMessage={popupMessage}
                showNextBtn={showNextBtn}
                onNextQuestion={handleNextQuestion}
              />
            )}

            {accepted && (
              <div className="fade-in">
                <Heart size={64} color="red" fill="red" style={{ margin: '0 auto 20px', display: 'block' }} />
                <h2 style={{ color: 'var(--primary-color)' }}>Yayy!</h2>
                <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>{CONFIG.proposalMessage}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;