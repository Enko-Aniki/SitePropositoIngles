import { useContext } from "react"
import { QuizContext } from "../context/quiz"

import './Options.css'

const Option = ({ option, selectoption, answer  }) => {
  const { state: quizState, dispatch } = useContext(QuizContext)

  return (
    <div className="option" onClick={ selectoption()}>
      <h3>{option}</h3>
    </div>
  )
}

export default Option