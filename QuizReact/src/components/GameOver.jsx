import { useContext } from "react"
import { QuizContext } from "../context/quiz" 
import { DragContext } from "../context/Drag_N_Drop"
import Welldone from '../img/welldone.svg'
import './GameOver.css'

const GameOver = () => {
  const { state: quizState, dispatch } = useContext(QuizContext)
  const  { dispatch: dragDispatch } = useContext(DragContext)

  const handleRestart = () => {
    dispatch({ type: "NEW_GAME" })
    dragDispatch({ type: "NEW_DRAG_GAME" }) // Reinicia o jogo de arrastar e soltar também
  }
  
  return (
    <div id ="gameover">
      <h2>Game Over</h2>
      <p>Pontuação: {quizState.score}</p>
      <p> Você acertou {quizState.score} de {quizState.questions.length} perguntas </p>
      <img src={Welldone} alt="Imagem de parabéns" />
      <p></p>
      <button onClick={handleRestart}>
        Reiniciar
      </button>
    </div>
    
  )
}

export default GameOver
