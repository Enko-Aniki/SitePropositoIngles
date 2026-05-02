import {useContext, useState} from "react"
import { DragContext } from "../context/Drag_N_Drop"
import "./DragGame.css"
const DragGame = () => {
  const { state, dispatch } = useContext(DragContext)
  const currentQuestion = state.questions[state.currentQuestion]

  const [arranged, setArranged] = useState([])       // palavras já colocadas
  const [available, setAvailable] = useState(currentQuestion.shuffledWords) // palavras disponíveis
  const [dragSource, setDragSource] = useState(null) // { from: "available"|"arranged", index }

  const handleDragStart = (from, index) => {
    setDragSource({ from, index })
  }

  const handleDropOnArranged = () => {
    if (!dragSource) return

    if (dragSource.from === "available") {
      const word = available[dragSource.index]
      setAvailable((prev) => prev.filter((_, i) => i !== dragSource.index))
      setArranged((prev) => [...prev, word])
    }
    setDragSource(null)
  }

  const handleDropOnAvailable = () => {
    if (!dragSource) return

    if (dragSource.from === "arranged") {
      const word = arranged[dragSource.index]
      setArranged((prev) => prev.filter((_, i) => i !== dragSource.index))
      setAvailable((prev) => [...prev, word])
    }
    setDragSource(null)
  }

  const handleConfirm = () => {
    dispatch({ type: "CHECK_ANSWER", payload: arranged })
    const next = state.questions[state.currentQuestion + 1]
    if (next) {
      setArranged([])
      setAvailable(next.shuffledWords)
    }
  }

  return (
    <div id="drag-game">
      <p>Pergunta {state.currentQuestion + 1} de {state.questions.length}</p>
      <h2>Monte a frase correta:</h2>

      {/* Área de resposta */}
      <div
        id="arranged-area"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropOnArranged}
      >
        {arranged.length === 0 && (
          <span className="placeholder">Arraste as palavras aqui</span>
        )}
        {arranged.map((word, index) => (
          <span
            key={index}
            className="word-chip arranged"
            draggable
            onDragStart={() => handleDragStart("arranged", index)}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Palavras disponíveis */}
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

      {currentQuestion.tip && (
        <p className="tip">💡 {currentQuestion.tip}</p>
      )}

      <button
        onClick={handleConfirm}
        disabled={arranged.length !== currentQuestion.correctOrder.length}
      >
        Confirmar
      </button>
    </div>
  )
}

export default DragGame
