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

 const onSelectOption = (option) => {
  // Corrigido: era currentQuestion.answer, não .option
  dispatch({ 
    type: "SELECT_OPTION", 
    payload: { answer: currentQuestion.answer, option } 
  });
};

  return (
    <div id="questions">
      <p>
        Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}
      </p>

      <h2>{currentQuestion.question}</h2>

      <div id="options-container">
       {currentQuestion.options.map((option) => (
  <Option 
    key={option} 
    option={option} 
    answer={currentQuestion.answer}
    selectOption={() => onSelectOption(option)} 
  />
))}
      </div>
        
        {quizState.answerSelected && (
          <button onClick={handleNextQuestion}>
        Próximo
      </button>
        )}
          
    
    </div>
  )
}

export default Questions