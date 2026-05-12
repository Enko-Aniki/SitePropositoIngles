import { useContext } from "react"
import { QuizContext } from "../context/quiz" 
import { DragContext } from "../context/Drag_N_Drop"
import { HangmanContext } from "../context/hangman"  // 👈 import faltando
import Welldone from '../img/welldone.svg'
import './GameOver.css'

const GameOver = () => {
  const { state: quizState, dispatch } = useContext(QuizContext)
  const { state: dragState, dispatch: dragDispatch } = useContext(DragContext)
  const { state: hangmanState, dispatch: hangmanDispatch } = useContext(HangmanContext)

  const handleRestart = () => {
    dispatch({ type: "NEW_GAME" })
    dragDispatch({ type: "NEW_DRAG_GAME" })
    hangmanDispatch({ type: "NEW_HANGMAN" })  // 👈 era "NEW_HANGMAN_GAME", correto é "NEW_HANGMAN"
  }

  const isDragGame = dragState.gameStage === "End"
  const isHangman = hangmanState.gameStage === "End"
  const score = isHangman ? hangmanState.score : isDragGame ? dragState.score : quizState.score
  const total = isHangman ? hangmanState.words.length : isDragGame ? dragState.questions.length : quizState.questions.length
  const modeName = isHangman ? "Forca" : isDragGame ? "Monte a Frase" : "Quiz"

  return (
    <div id="gameover">
      <h2>Game Over</h2>
      <p className="mode-label">{modeName}</p>
      <p>Pontuação: {score}</p>
      {/* <p>Você acertou {score} de {total} perguntas</p> */}
      <img src={Welldone} alt="Imagem de parabéns" />
      <p></p>
      <button onClick={handleRestart}>
        Reiniciar
      </button>
    </div>
  )
}

export default GameOver