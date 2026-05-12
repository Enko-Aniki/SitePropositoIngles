import { useContext, useEffect,  useCallback} from "react";
import { HangmanContext } from "../context/hangman";
import "./HangmanGame.css"

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")


const HangmanGame = () => {
  const { state, dispatch } = useContext(HangmanContext)
  const currentWordObj = state.words[state.currentWord]
  const { word, hint } = currentWordObj
  const wordLetters = word.split("")
  const won = wordLetters.every((letter) => state.guessedLetters.includes(letter))
  const lost = state.wrongLetters.length >= state.maxWrong
  const isFeedback = state.gameStage === "Feedback"

  // teclado físico
  const handleKeyDown = useCallback((e) => {
    if (isFeedback) return
    const letter = e.key.toUpperCase()
    if (/^[A-Z]$/.test(letter)) {
      dispatch({ type: "GUESS_LETTER", payload: letter })
    }
  }, [isFeedback, dispatch])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const wrongsLeft = state.maxWrong - state.wrongLetters.length

  return (
    <div id="hangman-game">
      <p className="hangman-counter">
        Palavra {state.currentWord + 1} de {state.words.length}
      </p>

      {/* Desenho da forca */}
      <HangmanDrawing wrong={state.wrongLetters.length} />

      {/* Tentativas restantes */}
      <p className="hangman-tries">
        {isFeedback
          ? won ? "✅ Você acertou!" : "❌ Você perdeu essa!"
          : `Tentativas restantes: ${wrongsLeft}`}
      </p>

      {/* Dica */}
      <p className="hangman-hint">💡 {hint}</p>

      {/* Palavra com lacunas */}
      <div className="word-display">
        {wordLetters.map((letter, index) => (
          <span
            key={index}
            className={`letter-box ${
              state.guessedLetters.includes(letter) || isFeedback
                ? "revealed"
                : ""
            } ${
              isFeedback && !state.guessedLetters.includes(letter)
                ? "missed"
                : ""
            }`}
          >
            {state.guessedLetters.includes(letter) || isFeedback
              ? letter
              : ""}
          </span>
        ))}
      </div>

      {/* Letras erradas */}
      {state.wrongLetters.length > 0 && (
        <div className="wrong-letters">
          <span>Erradas: </span>
          {state.wrongLetters.map((l) => (
            <span key={l} className="wrong-letter">{l}</span>
          ))}
        </div>
      )}

      {/* Teclado visual */}
      {!isFeedback && (
        <div className="keyboard" role="group" aria-label="Teclado de letras">
          {ALPHABET.map((letter) => {
            const isGuessed = state.guessedLetters.includes(letter)
            const isWrong = state.wrongLetters.includes(letter)
            return (
              <button
                key={letter}
                className={`key-btn ${isGuessed ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                onClick={() => dispatch({ type: "GUESS_LETTER", payload: letter })}
                disabled={isGuessed || isWrong}
                aria-label={`Letra ${letter}`}
              >
                {letter}
              </button>
            )
          })}
        </div>
      )}

      {/* Botão próxima palavra */}
      {isFeedback && (
        <button
          className="next-btn"
          onClick={() => dispatch({ type: "NEXT_WORD" })}
        >
          Próxima →
        </button>
      )}
    </div>
  )
}

// Desenho SVG da forca
const HangmanDrawing = ({ wrong }) => (
  <svg
    viewBox="0 0 200 220"
    className="hangman-svg"
    aria-label={`Forca com ${wrong} erros`}
  >
    {/* Estrutura */}
    <line x1="20" y1="210" x2="180" y2="210" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    <line x1="60" y1="210" x2="60" y2="20"  stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    <line x1="60" y1="20"  x2="130" y2="20" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    <line x1="130" y1="20" x2="130" y2="45" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    {/* Cabeça */}
    {wrong >= 1 && <circle cx="130" cy="60" r="15" stroke="currentColor" strokeWidth="3" fill="none"/>}
    {/* Corpo */}
    {wrong >= 2 && <line x1="130" y1="75" x2="130" y2="135" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>}
    {/* Braço esquerdo */}
    {wrong >= 3 && <line x1="130" y1="90" x2="105" y2="115" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>}
    {/* Braço direito */}
    {wrong >= 4 && <line x1="130" y1="90" x2="155" y2="115" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>}
    {/* Pernas */}
    {wrong >= 5 && <>
      <line x1="130" y1="135" x2="105" y2="170" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    {wrong >= 6 && <line x1="130" y1="135" x2="155" y2="170" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>}
    </>}
  </svg>
)

export default HangmanGame