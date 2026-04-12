import './Questions.css'
import Option from './Option'

// Context
import { useContext } from "react"
import { QuizContext } from "../context/quiz"

const Questions = () => {
  const { state: quizState, dispatch } = useContext(QuizContext)

  const currentQuestion = quizState.questions[quizState.currentQuestion]

  const handleNextQuestion = () => {
    dispatch({ type: "CHANGE_QUESTIONS" })
  }

  return (
    <div id="questions">
      <p>
        Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}
      </p>

      <h2>{currentQuestion.question}</h2>

      <div id="options-container">
          {currentQuestion.options.map((option) => (

        <button onClick={handleNextQuestion}>
          Próximo
        </button>
      </div>
    
    
    
      </div>
  )
}

export default Questions