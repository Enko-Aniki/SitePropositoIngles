import { useContext } from "react"
import { QuizContext } from "../context/quiz"
import './Options.css'

const Option = ({ option, selectOption, answer }) => {
  const { state: quizState } = useContext(QuizContext)

  const isCorrect = quizState.answerSelected && option === answer
  const isWrong = quizState.answerSelected && option !== answer
  const isSelected = quizState.selectedOption === option

  let ariaLabel = option
  if (quizState.answerSelected) {
    if (isCorrect) ariaLabel += ", resposta correta"
    else if (isSelected) ariaLabel += ", sua resposta, incorreta"
  }

  return (
    <div
      className={`option 
        ${isCorrect ? "correct" : ""}
        ${isWrong ? "wrong" : ""}
      `}
      onClick={() => !quizState.answerSelected && selectOption()}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !quizState.answerSelected) {
          e.preventDefault()
          selectOption()
        }
      }}
      role="button"
      tabIndex={quizState.answerSelected ? -1 : 0}
      aria-disabled={quizState.answerSelected}
      aria-label={ariaLabel}
      aria-pressed={isSelected}
    >
      <h3>{option}</h3>
    </div>
  )
}

export default Option
