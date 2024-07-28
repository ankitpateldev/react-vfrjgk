import React, { useState } from 'react';
import QuestionList from '../data/Questions.json';
import Question from './Question.js';
import QuizResult from './QuizResult.js';

function QuizScreen({ retry }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedAnswers, setMarkedAnswers] = useState(
    new Array(QuestionList.length).fill(-1)
  );

  const isQuestionEnd = currentQuestionIndex === QuestionList.length;

  function calculateResult() {
    let correct = 0;
    QuestionList.forEach((question, index) => {
      if (question.correctOptionIndex === markedAnswers[index]) {
        correct++;
      }
    });
    return {
      total: QuestionList.length,
      correct: correct,
      percentage: Math.trunc((correct / QuestionList.length) * 100),
    };
  }

  function handleAnswer(index) {
    setMarkedAnswers((arr) => {
      let newArr = [...arr];
      newArr[currentQuestionIndex] = index;
      return newArr;
    });
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handlePrevious() {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  }

  return (
    <div className="quiz-screen">
      {isQuestionEnd ? (
        <QuizResult result={calculateResult()} retry={retry} />
      ) : (
        <>
          <Question
            question={QuestionList[currentQuestionIndex]}
            totalQuestions={QuestionList.length}
            currentQuestion={currentQuestionIndex + 1}
            setAnswer={handleAnswer}
            selectedAnswer={markedAnswers[currentQuestionIndex]}
          />
          <div className="control">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              onClick={() => handleAnswer(markedAnswers[currentQuestionIndex])}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default QuizScreen;
