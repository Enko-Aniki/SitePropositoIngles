import { createContext, useReducer } from "react";
import hangmanWord from "../data/hangmanWords.js";

const STAGES = ["Pick", "Playing", "End"];  // 👈 era "Playling" (typo)
const MAX_WRONG = 6;

const getRandomWord = (wordsArray, amount = 5) => {
  return [...wordsArray].sort(() => Math.random() - 0.5).slice(0, amount);
}

const initialState = {
  gameStage: STAGES[0],
  categories: hangmanWord,
  words: [],
  currentWord: 0,
  guessedLetters: [],
  wrongLetters: [],
  score: 0,
  maxWrong: MAX_WRONG,  // 👈 era "MAX_WRONG" em maiúsculo, padronizado para camelCase
}

const hangmanReducer = (state, action) => {
  switch (action.type) {

    case "START_HANGMAN": {  // 👈 era "START", renomeado para não conflitar
      const randomWord = getRandomWord(action.payload, 5)  // 👈 era "getRandomWords" (inexistente) e "playload" (typo)
      return {
        ...state,
        words: randomWord,
        gameStage: STAGES[1],
        currentWord: 0,
        guessedLetters: [],
        wrongLetters: [],
        score: 0,
      }
    }

    case "GUESS_LETTER": {
      const letter = action.payload.toUpperCase()  // 👈 era "playload" (typo)
      const word = state.words[state.currentWord].word

      if (
        state.guessedLetters.includes(letter) ||
        state.wrongLetters.includes(letter)
      ) return state  // 👈 faltava fechar o if e o return — estava tudo dentro do if sem chave de fechamento

      const isCorrect = word.includes(letter)

      const newGuessed = isCorrect
        ? [...state.guessedLetters, letter]
        : state.guessedLetters

      const newWrong = !isCorrect
        ? [...state.wrongLetters, letter]
        : state.wrongLetters

      const wordLetters = [...new Set(word.split(""))]
      const won = wordLetters.every((letter) => newGuessed.includes(letter))
      const lost = newWrong.length >= state.maxWrong  // 👈 era state.MAX_WRONG

      if (won || lost) {
        return {
          ...state,
          guessedLetters: newGuessed,
          wrongLetters: newWrong,
          gameStage: "Feedback",  // 👈 vai para feedback antes de End
          score: won ? state.score + 100 : state.score,
        }
      }

      return {  // 👈 faltava esse return para quando não ganhou nem perdeu
        ...state,
        guessedLetters: newGuessed,
        wrongLetters: newWrong,
      }
    }  // 👈 faltava fechar o case "GUESS_LETTER"

    case "NEXT_WORD": {  // 👈 case faltando para avançar a palavra
      const nextIndex = state.currentWord + 1
      const ended = nextIndex >= state.words.length
      return {
        ...state,
        currentWord: nextIndex,
        guessedLetters: [],
        wrongLetters: [],
        gameStage: ended ? STAGES[2] : STAGES[1],
      }
    }

    case "NEW_HANGMAN":  // 👈 estava dentro do case GUESS_LETTER
      return initialState

    default:
      return state
  }
}

export const HangmanContext = createContext()

export const HangmanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(hangmanReducer, initialState)

  return (
    <HangmanContext.Provider value={{ state, dispatch }}>
      {children}
    </HangmanContext.Provider>
  )
}