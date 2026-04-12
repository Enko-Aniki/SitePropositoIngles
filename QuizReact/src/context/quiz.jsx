import { createContext, useReducer } from "react"

// Data
import questions from "../data/questions_english_a2_b1.js"

const STAGES = ["Start", "Playing", "End"]

const initialState = {
  gameStage: STAGES[0],
  questions,
  currentQuestion: 0,
  score:0
}

const quizReducer = (state, action) => {
  switch (action.type) {

    case "CHANGE_STAGE":
      return {
        ...state,
        gameStage: STAGES[1],
      }

    case "REORDER_QUESTIONS": {
      const reorderedQuestions = [...state.questions].sort(
        () => Math.random() - 0.5
      )

      return {
        ...state,
        questions: reorderedQuestions,
      }
    }

    case "CHANGE_QUESTIONS": {
      const nextQuestion = state.currentQuestion + 1

      const endGame = nextQuestion >= state.questions.length

      return {
        ...state,
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[2] : state.gameStage,
      }
    }
    case "NEW_GAME":
      return initialState 
      
    default:
      return state
  }
}

export const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}