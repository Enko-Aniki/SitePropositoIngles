import { useContext, useState } from "react"
import { DragContext } from "../context/Drag_N_Drop"
import "./DragGame.css"

const DragGame = () => {
  const { state, dispatch } = useContext(DragContext)
  const currentQuestion = state.questions[state.currentQuestion]

  const [arranged, setArranged] = useState([])
  const [available, setAvailable] = useState(currentQuestion.shuffledWords)
  const [dragSource, setDragSource] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null) // 👈 novo: destaque visual

  const handleDragStart = (from, index) => {
    setDragSource({ from, index })
  }

  // 👇 novo: soltar em cima de uma palavra já colocada — troca as posições
  const handleDropOnChip = (targetIndex) => {
    if (!dragSource) return

    if (dragSource.from === "arranged") {
      // reordena dentro do arranged
      const newArranged = [...arranged]
      const [moved] = newArranged.splice(dragSource.index, 1)
      newArranged.splice(targetIndex, 0, moved)
      setArranged(newArranged)

    } else if (dragSource.from === "available") {
      // move do available e insere na posição alvo
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

  // soltar na área vazia do arranged (no final da fila)
  const handleDropOnArranged = (e) => {
    e.stopPropagation() // evita conflito com handleDropOnChip
    if (!dragSource) return

    if (dragSource.from === "available") {
      const word = available[dragSource.index]
      setAvailable((prev) => prev.filter((_, i) => i !== dragSource.index))
      setArranged((prev) => [...prev, word])
    }
    // se vier de arranged e não caiu em cima de nenhum chip, não faz nada
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
    dispatch({ type: "CHECK_ANSWER", payload: arranged })
    const next = state.questions[state.currentQuestion + 1]
    if (next) {
      setArranged([])
      setAvailable(next.shuffledWords)
    }
  }

  const resetGameArea = () => {
    setArranged([])
    setAvailable(currentQuestion.shuffledWords)
    setDragOverIndex(null)
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
            className={`word-chip arranged ${dragOverIndex === index ? "drag-over" : ""}`} // 👈 destaque visual
            draggable
            onDragStart={() => handleDragStart("arranged", index)}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragOverIndex(index) // 👈 marca qual chip está sendo alvo
            }}
            onDragLeave={() => setDragOverIndex(null)}
            onDrop={(e) => {
              e.stopPropagation()
              handleDropOnChip(index)
            }}
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
      <button onClick={resetGameArea} className="reset-btn">
        Resetar
      </button>
    </div>
  )
}

export default DragGame