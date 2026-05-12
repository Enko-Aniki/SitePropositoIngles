import { useContext, useState } from "react"
import { DragContext } from "../context/Drag_N_Drop"
import "./DragGame.css"

const DragGame = () => {
  const { state, dispatch } = useContext(DragContext)
  const currentQuestion = state.questions[state.currentQuestion]

  const [arranged, setArranged] = useState([])
  const [available, setAvailable] = useState(currentQuestion.shuffledWords)
  const [dragSource, setDragSource] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const handleDragStart = (from, index) => {
    setDragSource({ from, index })
  }

  const handleDropOnChip = (targetIndex) => {
    if (!dragSource) return

    if (dragSource.from === "arranged") {
      const newArranged = [...arranged]
      const [moved] = newArranged.splice(dragSource.index, 1)
      newArranged.splice(targetIndex, 0, moved)
      setArranged(newArranged)
    } else if (dragSource.from === "available") {
      const word = available[dragSource.index]
      const newAvailable = available.filter((_, i) => i !== dragSource.index)
      const newArranged = [...arranged]
      newArranged.splice(targetIndex, 0, word)
      setAvailable(newAvailable)
      setArranged(newArranged)
    }

    setDragSource(null)
    setDragOverIndex(null)
  }

  const handleDropOnArranged = (e) => {
    e.stopPropagation()
    if (!dragSource) return

    if (dragSource.from === "available") {
      const word = available[dragSource.index]
      setAvailable((prev) => prev.filter((_, i) => i !== dragSource.index))
      setArranged((prev) => [...prev, word])
    }

    setDragSource(null)
    setDragOverIndex(null)
  }

  const handleDropOnAvailable = () => {
    if (!dragSource) return

    if (dragSource.from === "arranged") {
      const word = arranged[dragSource.index]
      setArranged((prev) => prev.filter((_, i) => i !== dragSource.index))
      setAvailable((prev) => [...prev, word])
    }

    setDragSource(null)
    setDragOverIndex(null)
  }

  const handleConfirm = () => {
    const isCorrect =
      arranged.join(" ").toLowerCase() ===  // 👈 corrigido
      currentQuestion.correctOrder.join(" ").toLowerCase()

    setFeedback(isCorrect ? "correct" : "wrong")  // 👈 corrigido: "correct"/"wrong" para bater com o CSS
  }

  const handleNext = () => {
    dispatch({ type: "CHECK_ANSWER", payload: arranged })  // 👈 corrigido o typo
    const next = state.questions[state.currentQuestion + 1]
    if (next) {
      setArranged([])
      setAvailable(next.shuffledWords)
      setFeedback(null)
    }
  }

  const resetGameArea = () => {
    setArranged([])
    setAvailable(currentQuestion.shuffledWords)
    setDragOverIndex(null)
    setFeedback(null)
  }

  return (  // 👈 return agora dentro da função corretamente
    <div id="drag-game">
      <p>Pergunta {state.currentQuestion + 1} de {state.questions.length}</p>
      <h2>Monte a frase correta:</h2>

      <div
        id="arranged-area"
        onDragOver={(e) => !feedback && e.preventDefault()}
        onDrop={(e) => !feedback && handleDropOnArranged(e)}
      >
        {arranged.length === 0 && (
          <span className="placeholder">Arraste as palavras aqui</span>
        )}
        {arranged.map((word, index) => (
          <span
            key={index}
            className={`word-chip arranged ${dragOverIndex === index ? "drag-over" : ""}`}
            draggable={!feedback}
            onDragStart={() => !feedback && handleDragStart("arranged", index)}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragOverIndex(index)
            }}
            onDragLeave={() => setDragOverIndex(null)}
            onDrop={(e) => {
              e.stopPropagation()
              !feedback && handleDropOnChip(index)
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {!feedback && (
        <div
          id="available-area"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnAvailable}
        >
          {available.map((word, index) => (
            <span
              key={index}
              className="word-chip"
              draggable
              onDragStart={() => handleDragStart("available", index)}
            >
              {word}
            </span>
          ))}
        </div>
      )}

      {feedback && (
        <div className={`feedback-box ${feedback}`}>
          {feedback === "correct" ? (
            <p className="feedback-title">✅ Correto!</p>
          ) : (
            <p className="feedback-title">❌ Quase lá!</p>
          )}
          <p className="feedback-label">Frase correta:</p>
          <div className="correct-sentence">
            {currentQuestion.correctOrder.map((word, index) => (
              <span
                key={index}
                className={`word-chip feedback-chip ${
                  arranged[index]?.toLowerCase() === word.toLowerCase()
                    ? "chip-correct"
                    : "chip-wrong"
                }`}
              >
                {word}
              </span>
            ))}
          </div>
          {currentQuestion.tip && (
            <p className="tip">💡 {currentQuestion.tip}</p>
          )}
        </div>
      )}

      {currentQuestion.tip && !feedback && (
        <p className="tip">💡 {currentQuestion.tip}</p>
      )}

      {!feedback ? (
        <div className="btn-row">
          <button
            onClick={handleConfirm}
            disabled={arranged.length !== currentQuestion.correctOrder.length}
          >
            Confirmar
          </button>
          <button onClick={resetGameArea} className="reset-btn">
            Resetar
          </button>
        </div>
      ) : (
        <button onClick={handleNext}>
          Próxima →
        </button>
      )}
    </div>
  )
}

export default DragGame