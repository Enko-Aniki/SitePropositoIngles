import { createContext, useReducer } from "react"
import questions from "../data/questionsfull.js"
import { getMaxScoreForCategory } from "../utils/gameScoring.js"

const STAGES = ["Start","Pick" ,"Playing", "End"]

const getRandomQuestions = (questionsArray, amount = 10) => {  // 👈 função aqui
  return [...questionsArray]
    .sort(() => Math.random() - 0.5)
    .slice(0, amount)
}


const initialState = {
  gameStage: STAGES[0],
  categories: questions,
  questions: [],  // ← inicia vazio, será preenchido ao escolher categoria
  currentQuestion: 0,
  score: 0,
  maxScore: 0,
  answerSelected: false,
  selectedOption: null,   // ← adicionado
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
    case "START_GAME": {
      const randomQuestions = getRandomQuestions(action.payload.questions, 10)
      return {
        ...state,
        questions: randomQuestions,
        gameStage: STAGES[2],
        currentQuestion: 0,
        score: 0,
        maxScore: getMaxScoreForCategory(action.payload.category),
        answerSelected: false,
        selectedOption: null,
      }
    }
    case "REORDER_OPTION": {
      const questions = [...state.questions]
      const currentQuestion = questions[state.currentQuestion]
      const options = [...currentQuestion.options]
      const reorderedOptions = options.sort(() => Math.random() - 0.5)

      questions[state.currentQuestion] = {
        ...currentQuestion,
        options: reorderedOptions,
      }

      return {
        ...state,
        questions,
      }
    }

    case "SELECT_OPTION": {
  if (state.answerSelected) return state;

  const option = action.payload.option;
  
  // Pegamos a questão atual diretamente do state do reducer
  const currentQuestion = state.questions[state.currentQuestion];
  const answer = currentQuestion.answer; // Resposta correta vinda da sua base de dados

  const pointsPerQuestion = state.questions.length
    ? state.maxScore / state.questions.length
    : 0;
  const correct = option === answer ? pointsPerQuestion : 0;

  return {
    ...state,
    score: Math.min(state.maxScore, state.score + correct),
    answerSelected: true,
    selectedOption: option,
  };
}
    
    case "CHANGE_QUESTIONS": {
      const nextQuestion = state.currentQuestion + 1
      const endGame = nextQuestion >= state.questions.length

      return {
        ...state,
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[3] : state.gameStage,
        selectedOption: null,    // ← reseta ao avançar
        answerSelected: false,   // ← reseta ao avançar
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