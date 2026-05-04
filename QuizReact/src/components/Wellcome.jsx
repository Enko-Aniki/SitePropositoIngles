import "./Wellcome.css"
import QuizImage from "../img/quiz.svg"
import { useContext } from "react"
import { QuizContext } from "../context/quiz"

const Wellcome = () => {
  const { dispatch } = useContext(QuizContext)

  return (
    <div id="quiz-wellcome" role="main" aria-label="Tela de boas vindas">
      <h2>Welcome to the Quiz</h2>
      <p>Click the button to start</p>
      <img src={QuizImage} alt="Ilustração de quiz com perguntas e respostas" />
      <p>Good luck!</p>
      <button
        onClick={() => dispatch({ type: "CHANGE_STAGE" })}
        aria-label="Iniciar o quiz de inglês"
        autoFocus
      >
        Start
      </button>
    </div>
  )
}

export default Wellcome
