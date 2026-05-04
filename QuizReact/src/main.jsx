import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { QuizProvider } from './context/quiz.jsx'
import { DragProvider } from './context/Drag_N_Drop.jsx'
import { AccessibilityProvider } from './context/AccessibilityContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccessibilityProvider>
      <QuizProvider>
        <DragProvider>
          <App />
        </DragProvider>
      </QuizProvider>
    </AccessibilityProvider>
  </StrictMode>,
)