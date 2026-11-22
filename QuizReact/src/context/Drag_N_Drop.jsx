import { createContext, useReducer } from "react" 
import dragQuestions from "../data/drag_and_drop.js"
import { getMaxScoreForCategory } from "../utils/gameScoring.js"

const STAGES = ["Pick", "Playing", "End"]

const getRandomQuestions = (questionsArray, amount = 10) => {
  return [...questionsArray]
    .sort(() => Math.random() - 0.5)
    .slice(0, amount)
}

const shuffleWords = (sentence) => {
  return sentence.split(" ").sort(() => Math.random() - 0.5)
}

const initialState = {
  gameStage: STAGES[0],
  categories: dragQuestions,
  questions: [],
  currentQuestion: 0,
  score: 0,
  maxScore: 0,
  completed: false,
}

const dragReducer = (state, action) => {
  switch (action.type) {

    case "START_DRAG_GAME": {        
      const randomQuestions = getRandomQuestions(action.payload.questions, 5).map((q) => ({
        ...q,
        shuffledWords: shuffleWords(q.sentence),
        correctOrder: q.sentence.split(" "),  
      }))
      return {
        ...state,
        questions: randomQuestions,
        gameStage: STAGES[1],
        currentQuestion: 0,           
        score: 0,
        maxScore: getMaxScoreForCategory(action.payload.category),
        completed: false,
      }
    }

    case "CHECK_ANSWER": {
      const current = state.questions[state.currentQuestion] 
      const isCorrect =
        action.payload.join(" ").toLowerCase() ===
        current.correctOrder.join(" ").toLowerCase()

      const nextQuestion = state.currentQuestion + 1
      const endGame = nextQuestion >= state.questions.length

      return {
        ...state,
        score: Math.min(
          state.maxScore,
          state.score + (isCorrect && state.questions.length
            ? state.maxScore / state.questions.length
            : 0),
        ),
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[2] : state.gameStage,
        completed: endGame,
      }
    }

    case "NEW_DRAG_GAME":             
      return initialState

    default:
      return state
  }
}

export const DragContext = createContext()

export const DragProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dragReducer, initialState)

  return (
    <DragContext.Provider value={{ state, dispatch }}>
      {children}
    </DragContext.Provider>
  )
}