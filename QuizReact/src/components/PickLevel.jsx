import { useContext } from "react"
import { QuizContext } from '../context/quiz'
import { DragContext } from "../context/Drag_N_Drop";
import { HangmanContext } from "../context/hangman";
import { AuthContext } from '../context/auth';
import "./PickLevel.css";

export const PickLevel = () => {
  const { state: quizState, dispatch: quizDispatch } = useContext(QuizContext)
  const { state: dragState, dispatch: dragDispatch } = useContext(DragContext)
  const { state: hangmanState, dispatch: hangmanDispatch } = useContext(HangmanContext)
  const { getQuizAvailabilityInfo } = useContext(AuthContext)
  const quizAvailability = getQuizAvailabilityInfo()

  const handleQuizStart = (category) => {
    if (!quizAvailability.canPlay) return
    quizDispatch({
      type: "START_GAME",
      payload: { category: category.category, questions: category.questions },
    })
  }

  return (
    <div id="category">
      <h2>ESCOLHA SEU NIVEL DE INGLÊS</h2>
      <p>Escolha o nível e o modo de jogo</p>

      {!quizAvailability.canPlay && (
        <div className="quiz-limit-warning">
          Você já completou 3 quizzes nas últimas 24 horas. Próxima oportunidade em {Math.ceil((quizAvailability.nextAvailableInMs || 0) / (60 * 60 * 1000))} hora(s).
        </div>
      )}

      <div id="mode-container">
        <div className="mode-box">
          <h3>🎯 Múltipla Escolha</h3>
          <p className="mode-desc">Escolha a alternativa correta</p>
          {quizState.categories.map((category) => (
            <button
              onClick={() => handleQuizStart(category)}
              key={category.category}
              disabled={!quizAvailability.canPlay}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="divider" />

        <div className="mode-box">
          <h3>🧩 Monte a Frase</h3>
          <p className="mode-desc">Arraste as palavras na ordem correta</p>
          {dragState.categories.map((category) => (
            <button onClick={() => dragDispatch({ type: "START_DRAG_GAME", payload: category })} key={category.category}>
              {category.category}
            </button>
          ))}
        </div>

        <div className="divider" />

        <div className="mode-box">
          <h3>💀 Forca</h3>
          <p className="mode-desc">Descubra a palavra letra por letra</p>
          {hangmanState.categories.map((category) => (
            <button onClick={() => hangmanDispatch({ type: "START_HANGMAN", payload: category })} key={category.category}>
              {category.category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}