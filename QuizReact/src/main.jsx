import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { QuizProvider } from './context/quiz.jsx'
import { DragProvider } from './context/Drag_N_Drop.jsx'  // 👈 importar o Provider, não o DragGame
import { HangmanProvider } from './context/hangman.jsx'  // 👈 novo import para o HangmanProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizProvider>
      <DragProvider> 
        <HangmanProvider>
        <App />
        </HangmanProvider>
      </DragProvider>       
    </QuizProvider>
  </StrictMode>,
)