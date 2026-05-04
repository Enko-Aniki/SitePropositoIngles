import { useContext, useState, useEffect, useRef } from "react"
import { DragContext } from "../context/Drag_N_Drop"
import { useAccessibility } from "../context/AccessibilityContext"
import "./DragGame.css"

const DragGame = () => {
  const { state, dispatch } = useContext(DragContext)
  const { speak, speakOnce } = useAccessibility()
  const currentQuestion = state.questions[state.currentQuestion]

  const [arranged, setArranged] = useState([])
  const [available, setAvailable] = useState(currentQuestion.shuffledWords)
  const [dragSource, setDragSource] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const [lastFeedback, setLastFeedback] = useState("")

  useEffect(() => {
    const instruction = "Question " + (state.currentQuestion + 1) + " of " + state.questions.length + ". Build the correct sentence using: " + currentQuestion.shuffledWords.join(", ")
    speak(instruction)
  }, [state.currentQuestion])

  const handleDragStart = (from, index) => setDragSource({ from, index })

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

  const handleClickWord = (word, index, from) => {
    if (from === "available") {
      setAvailable((prev) => prev.filter((_, i) => i !== index))
      setArranged((prev) => [...prev, word])
      speak("Added: " + word)
    } else {
      setArranged((prev) => prev.filter((_, i) => i !== index))
      setAvailable((prev) => [...prev, word])
      speak("Removed: " + word)
    }
  }

  const handleConfirm = () => {
    const isCorrect = arranged.join(" ").toLowerCase() === currentQuestion.correctOrder.join(" ").toLowerCase()
    const feedback = isCorrect
      ? "Correct! The sentence is: " + currentQuestion.correctOrder.join(" ")
      : "Incorrect. The correct sentence is: " + currentQuestion.correctOrder.join(" ")
    setLastFeedback(feedback)
    speak(feedback)
    dispatch({ type: "CHECK_ANSWER", payload: arranged })
    const next = state.questions[state.currentQuestion + 1]
    if (next) {
      setArranged([])
      setAvailable(next.shuffledWords)
      setLastFeedback("")
    }
  }

  const resetGameArea = () => {
    setArranged([])
    setAvailable(currentQuestion.shuffledWords)
    setDragOverIndex(null)
    speak("Reset. All words are available again.")
  }

  return (
    <div id="drag-game" role="main" aria-label="Jogo Monte a Frase">
      <div aria-live="assertive" aria-atomic="true" style={{position:"absolute",width:"1px",height:"1px",overflow:"hidden",clip:"rect(0,0,0,0)"}}>
        {lastFeedback}
      </div>

      <p>{"Pergunta " + (state.currentQuestion + 1) + " de " + state.questions.length}</p>
      <h2>Monte a frase correta:</h2>

      <button className="speak-words-btn" onClick={() => speakOnce("Available words: " + available.join(", "))} type="button" aria-label="Ouvir palavras disponíveis">
        Ouvir palavras
      </button>

      <div
        id="arranged-area"
        role="list"
        aria-label="Sua frase. Clique em uma palavra para removê-la."
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropOnArranged}
      >
        {arranged.length === 0 && <span className="placeholder">Arraste as palavras aqui</span>}
        {arranged.map((word, index) => (
          <span
            key={index}
            className={"word-chip arranged " + (dragOverIndex === index ? "drag-over" : "")}
            draggable
            role="listitem"
            tabIndex={0}
            aria-label={word + ", posição " + (index + 1) + ". Enter para remover."}
            onDragStart={() => handleDragStart("arranged", index)}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragOverIndex(index) }}
            onDragLeave={() => setDragOverIndex(null)}
            onDrop={(e) => { e.stopPropagation(); handleDropOnChip(index) }}
            onClick={() => handleClickWord(word, index, "arranged")}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClickWord(word, index, "arranged") } }}
          >{word}</span>
        ))}
      </div>

      <div
        id="available-area"
        role="list"
        aria-label="Palavras disponíveis. Enter para adicionar."
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropOnAvailable}
      >
        {available.map((word, index) => (
          <span
            key={index}
            className="word-chip"
            draggable
            role="listitem"
            tabIndex={0}
            aria-label={word + ". Enter para adicionar."}
            onDragStart={() => handleDragStart("available", index)}
            onClick={() => handleClickWord(word, index, "available")}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClickWord(word, index, "available") } }}
          >{word}</span>
        ))}
      </div>

      {currentQuestion.tip && <p className="tip" role="note">💡 {currentQuestion.tip}</p>}

      <button onClick={handleConfirm} disabled={arranged.length !== currentQuestion.correctOrder.length} aria-label="Confirmar frase">
        Confirmar
      </button>
      <button onClick={resetGameArea} className="reset-btn" aria-label="Resetar">
        Resetar
      </button>
    </div>
  )
}

export default DragGame
