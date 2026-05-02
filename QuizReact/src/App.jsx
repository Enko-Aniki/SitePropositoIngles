import './App.css'

// Components
import Wellcome from "./components/Wellcome"
import Questions from './components/Questions'
import GameOver from './components/GameOver'
import DragGame from './components/DragGame'

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

      {quizState.gameStage === "Start" && <Wellcome />}

      {/* 👇 só mostra PickLevel quando nenhum jogo está ativo */}
      {quizState.gameStage === "Pick" && dragState.gameStage === "Pick" && <PickLevel />}

      {/* Modo Quiz */}
      {quizState.gameStage === "Playing" && <Questions />}
      {quizState.gameStage === "End" && <GameOver />}

      {/* Modo Drag and Drop */}
      {dragState.gameStage === "Playing" && <DragGame />}
      {dragState.gameStage === "End" && <GameOver />}
    </div>
  )
}

export default App