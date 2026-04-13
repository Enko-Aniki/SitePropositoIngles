import './Questions.css'

// Context
import { useContext } from "react"
import { QuizContext } from "../context/quiz"

// Component
import Option from "./Option"

const Questions = () => {
  const { state: quizState, dispatch } = useContext(QuizContext)

  const currentQuestion = quizState.questions[quizState.currentQuestion]

  const handleNextQuestion = () => {
    dispatch({ type: "CHANGE_QUESTIONS" })
  }

  const selectoption = (option) => {
    dispatch({ type: "SELECT_OPTION", payload: { answer: currentQuestion.answer, option } }) 
  }

  return (
    <div id="questions">
      <p>
        Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}
      </p>

      <h2>{currentQuestion.question}</h2>

      <div id="options-container">
        {currentQuestion.options.map((option, index) => (
          <Option key={index} option={option} answer={currentQuestion.answer}
          selectoption={() => selectoption(option)} />
        ))}
      </div>


          <button onClick={handleNextQuestion}>
        Próximo
      </button>
    
    </div>
  )
}

export default Questions