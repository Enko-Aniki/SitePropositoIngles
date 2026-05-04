import { useContext } from "react"
import { QuizContext } from "../context/quiz" 
import { DragContext } from "../context/Drag_N_Drop"
import Welldone from '../img/welldone.svg'
import './GameOver.css'

const GameOver = () => {
  const { state: quizState, dispatch } = useContext(QuizContext)
  const { state: dragState, dispatch: dragDispatch } = useContext(DragContext) // 👈 adicionou state

  const handleRestart = () => {
    dispatch({ type: "NEW_GAME" })
    dragDispatch({ type: "NEW_DRAG_GAME" })
  }

  // 👇 detecta qual jogo terminou
  const isDragGame = dragState.gameStage === "End"
  const score = isDragGame ? dragState.score : quizState.score
  const total = isDragGame ? dragState.questions.length : quizState.questions.length
  const modeName = isDragGame ? "Monte a Frase" : "Quiz"

  return (
    <div id="gameover">
      <h2>Game Over</h2>
      <p className="mode-label">{modeName}</p>  {/* 👈 mostra qual modo foi jogado */}
      <p>Pontuação: {score}</p>
      <p>Você acertou {score} de {total} perguntas</p>
      <img src={Welldone} alt="Imagem de parabéns" />
      <p>Parabéns por completar o jogo!</p>
      <p></p>
      <button onClick={handleRestart}>
        Reiniciar
      </button>
    </div>
  )
}

export default GameOver