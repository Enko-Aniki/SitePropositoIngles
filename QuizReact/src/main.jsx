import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { QuizProvider } from './context/quiz.jsx'
import { DragProvider } from './context/Drag_N_Drop.jsx'  // 👈 importar o Provider, não o DragGame
import { HangmanProvider } from './context/hangman.jsx'  // 👈 novo import para o HangmanProvider
import { AuthProvider } from './context/auth.jsx'
import { QuestionsProvider } from './context/questions.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QuestionsProvider>
        <QuizProvider>
          <DragProvider> 
            <HangmanProvider>
            <App />
            </HangmanProvider>
          </DragProvider>       
        </QuizProvider>
      </QuestionsProvider>
    </AuthProvider>
  </StrictMode>,
)