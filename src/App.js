import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import './styles/PApp.css'; // Import the CSS
import { CONFIG, QUESTION_DATA } from './config/constants';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import QuestionCard from './components/QuestionCard';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
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
    // Defines the "Safe Zones" where the button can go
    // Button moves within main-area container with padding from all edges
    // Safe zones avoid overlapping the centered content-box
    
    const safeZones = [
      // ZONE 1: TOP-LEFT corner
      { topMin: '3%', topMax: '25%', leftMin: '3%', leftMax: '30%' },
      
      // ZONE 2: TOP-RIGHT corner
      { topMin: '3%', topMax: '25%', leftMin: '70%', leftMax: '97%' },
      
      // ZONE 3: BOTTOM-LEFT corner
      { topMin: '75%', topMax: '97%', leftMin: '3%', leftMax: '30%' },
      
      // ZONE 4: BOTTOM-RIGHT corner
      { topMin: '75%', topMax: '97%', leftMin: '70%', leftMax: '97%' },

      // ZONE 5: TOP-CENTER
      { topMin: '3%', topMax: '18%', leftMin: '35%', leftMax: '65%' },

      // ZONE 6: BOTTOM-CENTER
      { topMin: '82%', topMax: '97%', leftMin: '35%', leftMax: '65%' }
    ];

    // 1. Pick a random zone
    const randomZone = safeZones[Math.floor(Math.random() * safeZones.length)];

    // 2. Generate random coordinates within that specific zone
    const topMin = parseFloat(randomZone.topMin);
    const topMax = parseFloat(randomZone.topMax);
    const leftMin = parseFloat(randomZone.leftMin);
    const leftMax = parseFloat(randomZone.leftMax);

    const randomTop = (Math.random() * (topMax - topMin) + topMin).toFixed(1);
    const randomLeft = (Math.random() * (leftMax - leftMin) + leftMin).toFixed(1);

    setNoBtnPosition({ 
      position: 'absolute', 
      top: `${randomTop}%`, 
      left: `${randomLeft}%`,
      transform: 'translate(-50%, -50%)'
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
        {/* NO Button - Only appears after interaction */}
        {mode && !accepted && showNextBtn && (
          <button 
            className="btn secondary-btn"
            style={{ 
              position: noBtnPosition.position, 
              top: noBtnPosition.top, 
              left: noBtnPosition.left,
              transform: noBtnPosition.transform || 'none',
              zIndex: 100
            }}
            onMouseEnter={handleNoInteraction}
            onClick={handleNoInteraction}
          >
            NO
          </button>
        )}

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
                popupMessage={popupMessage}
                showNextBtn={showNextBtn}
                onNextQuestion={handleNextQuestion}
                accepted={false}
              />
            )}

            {accepted && (
              <QuestionCard 
                questionData={QUESTION_DATA[mode][currentQIndex]}
                mode={mode}
                showHint={showHint}
                toggleHint={() => setShowHint(true)}
                onYes={() => setAccepted(true)}
                onNoHover={handleNoInteraction}
                popupMessage={popupMessage}
                showNextBtn={showNextBtn}
                onNextQuestion={handleNextQuestion}
                accepted={true}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;