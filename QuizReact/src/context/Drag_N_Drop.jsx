import { createContext, useReducer } from "react"  // 👈 removido "act"
import dragQuestions from "../data/drag_and_drop.js"

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
  completed: false,
}

const dragReducer = (state, action) => {
  switch (action.type) {

    case "START_DRAG_GAME": {         // 👈 era "START_GAME"
      const randomQuestions = getRandomQuestions(action.payload, 5).map((q) => ({  // 👈 era "playload"
        ...q,
        shuffledWords: shuffleWords(q.sentence),
        correctOrder: q.sentence.split(" "),  // 👈 tinha espaço errado
      }))
      return {
        ...state,
        questions: randomQuestions,
        gameStage: STAGES[1],
        currentQuestion: 0,           // 👈 era "currentQuestions"
        score: 0,
        completed: false,
      }
    }

    case "CHECK_ANSWER": {
      const current = state.questions[state.currentQuestion]  // 👈 lógica reescrita
      const isCorrect =
        action.payload.join(" ").toLowerCase() ===
        current.correctOrder.join(" ").toLowerCase()

      const nextQuestion = state.currentQuestion + 1
      const endGame = nextQuestion >= state.questions.length

      return {
        ...state,
        score: state.score + (isCorrect ? 1 : 0),
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[2] : state.gameStage,
        completed: endGame,
      }
    }

    case "NEW_DRAG_GAME":             // 👈 era "NEW_DRAG_GAMES"
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