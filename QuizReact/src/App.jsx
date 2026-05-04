import './App.css'

// Components
import Wellcome from "./components/Wellcome"
import Questions from './components/Questions'
import GameOver from './components/GameOver'
import DragGame from './components/DragGame'
import AccessibilityBar from './components/AccessibilityBar'

// Context
import { QuizContext } from "./context/quiz"
import { DragContext } from "./context/Drag_N_Drop"

// Hooks
import { useContext } from "react"
import { PickLevel } from './components/PickLevel'

function App() {
  const { state: quizState } = useContext(QuizContext)
  const { state: dragState } = useContext(DragContext)

  return (
    <div className="App">
      <h1>Quiz de Inglês</h1>

      {/* Barra de acessibilidade sempre visível */}
      <AccessibilityBar />

      {quizState.gameStage === "Start" && <Wellcome />}

      {quizState.gameStage === "Pick" && dragState.gameStage === "Pick" && <PickLevel />}

      {/* Modo Quiz */}
      {quizState.gameStage === "Playing" && <Questions />}
      {quizState.gameStage === "End" && <GameOver />}

      {/* Modo Drag and Drop */}
      {dragState.gameStage === "Playing" && <DragGame />}
      {dragState.gameStage === "End" && quizState.gameStage === "Pick" && <GameOver />}
    </div>
  )
}

export default App