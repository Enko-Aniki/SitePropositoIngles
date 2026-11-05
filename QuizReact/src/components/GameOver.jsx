import { useContext, useRef } from "react"
import { QuizContext } from "../context/quiz" 
import { DragContext } from "../context/Drag_N_Drop"
import { HangmanContext } from "../context/hangman"
import { AuthContext } from "../context/auth"
import Welldone from '../img/welldone.svg'
import './GameOver.css'

const GameOver = () => {
  const { state: quizState, dispatch } = useContext(QuizContext)
  const { state: dragState, dispatch: dragDispatch } = useContext(DragContext)
  const { state: hangmanState, dispatch: hangmanDispatch } = useContext(HangmanContext)
  const { user, registerQuizScore, getQuizAvailabilityInfo } = useContext(AuthContext)
  const scoreSavedRef = useRef(false)

  const handleRestart = () => {
    scoreSavedRef.current = false
    dispatch({ type: "NEW_GAME" })
    dragDispatch({ type: "NEW_DRAG_GAME" })
    hangmanDispatch({ type: "NEW_HANGMAN" })
  }

  const isDragGame = dragState.gameStage === "End"
  const isHangman = hangmanState.gameStage === "End"
  const isQuizGame = !isDragGame && !isHangman
  const score = isHangman ? hangmanState.score : isDragGame ? dragState.score : quizState.score
  const total = isHangman ? hangmanState.words.length : isDragGame ? dragState.questions.length : quizState.questions.length
  const modeName = isHangman ? "Forca" : isDragGame ? "Monte a Frase" : "Quiz"

  const quizAvailability = getQuizAvailabilityInfo ? getQuizAvailabilityInfo() : { canPlay: true }

  if (isQuizGame && quizAvailability.canPlay && user && score > 0 && !scoreSavedRef.current) {
    scoreSavedRef.current = true
    registerQuizScore(score)
  }

  return (
    <div id="gameover">
      <h2>Game Over</h2>
      <p className="mode-label">{modeName}</p>
      <p>Pontuação: {score}</p>
      {isQuizGame && (
        <p>Total acumulado: {user?.totalScore ?? 0}</p>
      )}
      {!quizAvailability.canPlay && isQuizGame && (
        <p>Você atingiu o limite de 3 tentativas por dia. Próxima tentativa em {Math.ceil((quizAvailability.nextAvailableInMs || 0) / (60 * 60 * 1000))}h.</p>
      )}
      <img src={Welldone} alt="Imagem de parabéns" />
      <p></p>
      <button onClick={handleRestart}>
        Reiniciar
      </button>
    </div>
  )
}

export default GameOver