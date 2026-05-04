import { useContext, useEffect } from "react"
import { QuizContext } from "../context/quiz" 
import { DragContext } from "../context/Drag_N_Drop"
import { useAccessibility } from "../context/AccessibilityContext"
import Welldone from "../img/welldone.svg"
import "./GameOver.css"

const GameOver = () => {
  const { state: quizState, dispatch } = useContext(QuizContext)
  const { state: dragState, dispatch: dragDispatch } = useContext(DragContext)
  const { speak } = useAccessibility()

  const isDragGame = dragState.gameStage === "End"
  const score = isDragGame ? dragState.score : quizState.score
  const total = isDragGame ? dragState.questions.length : quizState.questions.length
  const modeName = isDragGame ? "Monte a Frase" : "Quiz"

  useEffect(() => {
    const msg = "Game Over! " + modeName + ". You got " + score + " out of " + total + " correct."
    speak(msg, true)
  }, [])

  const handleRestart = () => {
    dispatch({ type: "NEW_GAME" })
    dragDispatch({ type: "NEW_DRAG_GAME" })
  }

  return (
    <div id="gameover" role="main" aria-label="Fim de jogo">
      <h2>Game Over</h2>
      <p className="mode-label">{modeName}</p>
      <p aria-live="polite">Pontuação: {score}</p>
      <p>Você acertou {score} de {total} perguntas</p>
      <img src={Welldone} alt="Imagem de parabéns" />
      <p>Parabéns por completar o jogo!</p>
      <button onClick={handleRestart} aria-label="Reiniciar o quiz">
        Reiniciar
      </button>
    </div>
  )
}

export default GameOver
