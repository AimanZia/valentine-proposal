import React from 'react';
import { Info, ArrowRight } from 'lucide-react';

const QuestionCard = ({ 
  questionData, 
  mode, 
  showHint, 
  toggleHint, 
  onYes, 
  onNoHover, 
  noBtnPosition, 
  popupMessage, 
  showNextBtn, 
  onNextQuestion 
}) => {
  return (
    <div className="fade-in">
      <span style={{ fontSize: '0.8rem', fontWeight: 'bold', opacity: 0.7, letterSpacing: '1px' }}>
        {mode.toUpperCase()} MODE
      </span>
      
      <h3 style={{ fontSize: '1.5rem', margin: '20px 0', lineHeight: 1.3 }}>
        {questionData.question}
      </h3>

      <div style={{ minHeight: '40px', marginBottom: '20px' }}>
        {!showHint ? (
          <button 
            onClick={toggleHint}
            style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', margin: '0 auto' }}
          >
            <Info size={16} /> Show Hint
          </button>
        ) : (
          <p style={{ fontStyle: 'italic', color: 'var(--primary-color)' }}>💡 {questionData.hint}</p>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', height: '50px', position: 'relative' }}>
        <button className="btn primary-btn" onClick={onYes} style={{ zIndex: 10 }}>
          YES
        </button>
        
        <button 
          className="btn secondary-btn"
          style={{ 
            position: noBtnPosition.position, 
            top: noBtnPosition.top, 
            left: noBtnPosition.left, 
            transition: 'all 0.3s ease',
            zIndex: 100 
          }}
          onMouseEnter={onNoHover}
          onClick={onNoHover}
        >
          NO
        </button>
      </div>

      {(popupMessage || showNextBtn) && (
        <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          {popupMessage && <div className="popup">{popupMessage}</div>}
          
          {showNextBtn && (
            <button 
              onClick={onNextQuestion}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--primary-color)', background: 'white', cursor: 'pointer' }}
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