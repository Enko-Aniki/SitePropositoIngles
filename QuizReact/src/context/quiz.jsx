import { createContext, useReducer } from "react"
import questions from "../data/questionsfull.js"

const STAGES = ["Start","Pick" ,"Playing", "End"]

const initialState = {
  gameStage: STAGES[0],
  questions,
  currentQuestion: 0,
  score: 0,
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
      return {
        ...state,
        questions: action.payload,
        gameStage: STAGES[2],
        currentQuestion: 0,
        score: 0,
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
  // Se o usuário já clicou em uma opção, travamos para não ganhar pontos extras
  if (state.answerSelected) return state;

  const answer = action.payload.answer;
  const option = action.payload.option;
  let correct = 0;

  // Comparação real entre a resposta certa e a escolhida
  if (option === answer) correct = 1;

  return {
    ...state,
    score: state.score + correct,
    answerSelected: true, // Indica que a pergunta foi respondida
    selectedOption: option, // Salva qual foi a escolha para o CSS
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