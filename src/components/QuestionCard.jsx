import React from 'react';
import { Info, ArrowRight, Heart } from 'lucide-react';
import '../styles/QuestionCard.css';

const QuestionCard = ({ 
  questionData, 
  mode, 
  showHint, 
  toggleHint, 
  onYes,
  onNoHover,
  popupMessage, 
  showNextBtn, 
  onNextQuestion,
  accepted
}) => {
  if (accepted) {
    return (
      <div className="question-card-container fade-in">
        <div className="acceptance-container">
          <Heart size={64} className="acceptance-icon" color="var(--primary-color)" fill="currentColor" />
          <h2 className="acceptance-heading">Yayy!</h2>
          <p className="acceptance-message">You've made me the happiest! 💖🌹✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="question-card-container fade-in">
      <span className="question-mode-label">{mode.toUpperCase()} MODE</span>
      
      <h3 className="question-text">
        {questionData.question}
      </h3>

      <div className="hint-section">
        {!showHint ? (
          <button 
            onClick={toggleHint}
            className="hint-button"
          >
            <Info size={16} /> Show Hint
          </button>
        ) : (
          <p className="hint-text">💡 {questionData.hint}</p>
        )}
      </div>

      <div className="buttons-container">
        <button className="btn primary-btn yes-button" onClick={onYes}>
          YES
        </button>
        
        {!showNextBtn && (
          <button 
            className="btn secondary-btn no-button"
            onMouseEnter={onNoHover}
            onClick={onNoHover}
          >
            NO
          </button>
        )}
      </div>

      {(popupMessage || showNextBtn) && (
        <div className="next-question-container">
          {popupMessage && <div className="popup">{popupMessage}</div>}
          
          {showNextBtn && (
            <button 
              onClick={onNextQuestion}
              className="next-question-button"
            >
              Okay, ask another question <ArrowRight size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;