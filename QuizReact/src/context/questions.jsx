import React, { createContext, useState, useEffect } from 'react';
import quizQuestions from '../data/questionsfull';
import dragQuestions from '../data/drag_and_drop';
import hangmanWords from '../data/hangmanWords';

export const QuestionsContext = createContext();

export function QuestionsProvider({ children }) {
  const [quizData, setQuizData] = useState(quizQuestions);
  const [dragData, setDragData] = useState(dragQuestions);
  const [hangmanData, setHangmanData] = useState(hangmanWords);

  // Load from localStorage on mount
  useEffect(() => {
    const savedQuiz = localStorage.getItem('quizData');
    const savedDrag = localStorage.getItem('dragData');
    const savedHangman = localStorage.getItem('hangmanData');

    if (savedQuiz) setQuizData(JSON.parse(savedQuiz));
    if (savedDrag) setDragData(JSON.parse(savedDrag));
    if (savedHangman) setHangmanData(JSON.parse(savedHangman));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('quizData', JSON.stringify(quizData));
  }, [quizData]);

  useEffect(() => {
    localStorage.setItem('dragData', JSON.stringify(dragData));
  }, [dragData]);

  useEffect(() => {
    localStorage.setItem('hangmanData', JSON.stringify(hangmanData));
  }, [hangmanData]);

  // Quiz operations
  const addQuizQuestion = (categoryIndex, question) => {
    const newData = [...quizData];
    newData[categoryIndex].questions.push(question);
    setQuizData(newData);
  };

  const updateQuizQuestion = (categoryIndex, questionIndex, updatedQuestion) => {
    const newData = [...quizData];
    newData[categoryIndex].questions[questionIndex] = updatedQuestion;
    setQuizData(newData);
  };

  const deleteQuizQuestion = (categoryIndex, questionIndex) => {
    const newData = [...quizData];
    newData[categoryIndex].questions.splice(questionIndex, 1);
    setQuizData(newData);
  };

  // Drag operations
  const addDragQuestion = (categoryIndex, question) => {
    const newData = [...dragData];
    newData[categoryIndex].questions.push(question);
    setDragData(newData);
  };

  const updateDragQuestion = (categoryIndex, questionIndex, updatedQuestion) => {
    const newData = [...dragData];
    newData[categoryIndex].questions[questionIndex] = updatedQuestion;
    setDragData(newData);
  };

  const deleteDragQuestion = (categoryIndex, questionIndex) => {
    const newData = [...dragData];
    newData[categoryIndex].questions.splice(questionIndex, 1);
    setDragData(newData);
  };

  // Hangman operations
  const addHangmanWord = (categoryIndex, word) => {
    const newData = [...hangmanData];
    newData[categoryIndex].words.push(word);
    setHangmanData(newData);
  };

  const updateHangmanWord = (categoryIndex, wordIndex, updatedWord) => {
    const newData = [...hangmanData];
    newData[categoryIndex].words[wordIndex] = updatedWord;
    setHangmanData(newData);
  };

  const deleteHangmanWord = (categoryIndex, wordIndex) => {
    const newData = [...hangmanData];
    newData[categoryIndex].words.splice(wordIndex, 1);
    setHangmanData(newData);
  };

  const value = {
    // Quiz
    quizData,
    addQuizQuestion,
    updateQuizQuestion,
    deleteQuizQuestion,
    // Drag
    dragData,
    addDragQuestion,
    updateDragQuestion,
    deleteDragQuestion,
    // Hangman
    hangmanData,
    addHangmanWord,
    updateHangmanWord,
    deleteHangmanWord,
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
}
