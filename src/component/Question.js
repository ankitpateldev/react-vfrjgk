import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

function Question({ question, totalQuestions, currentQuestion, setAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const timer = useRef(null);
  const progressBar = useRef(null);

  function gotoNextQuestion() {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    flushSync(() => {
      setAnswer(selectedOption);
    });
    setSelectedOption(null);
    setIsAnswered(false); // Reset the answered state for the next question
  }

  useEffect(() => {
    progressBar.current.classList.remove('active');
    setTimeout(() => {
      progressBar.current.classList.add('active');
    }, 0);
    timer.current = setTimeout(gotoNextQuestion, 20 * 1000); // 20 sec
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [question]);

  return (
    <div className="question">
      <div className="progress-bar" ref={progressBar}> </div>
      <div className="question-count">
        <b>{currentQuestion}</b> of <b>{totalQuestions}</b>
      </div>
      <div className="main">
        <div className="title">
          <span>Question: </span>
          <p>{question.title}</p>
        </div>
        <div className="options">
          {question.options.map((option, index) => {
            let className = 'option';
            if (isAnswered) {
              if (index === question.correctOptionIndex) {
                className += ' correct'; // Correct answer
              } else if (index === selectedOption) {
                className += ' incorrect'; // Selected incorrect answer
              }
            } else if (index === selectedOption) {
              className += ' active'; // Selected option
            }

            return (
              <div
                className={className}
                key={index}
                onClick={() => {
                  if (!isAnswered) {
                    setSelectedOption(index);
                    setIsAnswered(true);
                  }
                }}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>
    /*<div className="control">
        <button onClick={gotoNextQuestion}>Next</button>
      </div>*/
    </div>
  );
}

export default Question;
