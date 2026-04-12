import './Wellcome.css'

// Assets
import QuizImage from "../img/quiz.svg"

// Context
import { useContext } from "react"
import { QuizContext } from "../context/quiz"

const Wellcome = () => {
  const { state: quizState, dispatch } = useContext(QuizContext)

  return (
    <div id="quiz-wellcome">
      <h2>Welcome to the Quiz</h2>

      <p>Click the button to start</p>

      <img src={QuizImage} alt="Quiz beginning" />

      <p>Good luck!</p>

      <button onClick={() => dispatch({ type: "CHANGE_STAGE" })}>
        Start
      </button>
    </div>
  )
}

export default Wellcome