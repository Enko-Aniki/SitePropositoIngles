import './App.css'

// Components
import Wellcome from "./components/Wellcome"
import Questions from './components/Questions'
import GameOver from './components/GameOver'

// Context
import { QuizContext } from "./context/quiz"

// Hooks
import { useContext, useEffect } from "react"

function App() {
  const { state: quizState, dispatch } = useContext(QuizContext)

  // Embaralhar perguntas ao iniciar
  useEffect(() => {
    dispatch({ type: "REORDER_QUESTIONS" })
  }, [dispatch])

  return (
    <div className="App">
      <h1>Quiz de Inglês</h1>

      {quizState.gameStage === "Start" && <Wellcome />}
      {quizState.gameStage === "Playing" && <Questions />}
      {quizState.gameStage === "End" && <GameOver />}
    </div>
  )
}

export default App