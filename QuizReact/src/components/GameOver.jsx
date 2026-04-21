import { useContext } from "react"
import { QuizContext } from "../context/quiz" 
import Welldone from '../img/welldone.svg'
import './GameOver.css'

const GameOver = () => {
  const { state: quizState, dispatch } = useContext(QuizContext)
  return (
    <div id ="gameover">
      <h2>Game Over</h2>
      <p>Pontuação: {quizState.score}</p>
      <p> Você acertou {quizState.score} de {quizState.questions.length} perguntas </p>
      <img src={Welldone} alt="Imagem de parabéns" />
      <p></p>
      <button onClick={() => dispatch({ type: "NEW_GAME" })}>
        Reiniciar
      </button>
    </div>
    
  )
}

export default GameOver
