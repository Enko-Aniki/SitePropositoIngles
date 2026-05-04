import './Questions.css'

// Context
import { useContext, useEffect, useRef } from "react"
import { QuizContext } from "../context/quiz"
import { useAccessibility } from "../context/AccessibilityContext"

// Component
import Option from "./Option"

const Questions = () => {
  const { state: quizState, dispatch } = useContext(QuizContext)
  const { speak, speakOnce } = useAccessibility()
  const questionRef = useRef(null)

  const currentQuestion = quizState.questions[quizState.currentQuestion]

  // Lê a pergunta automaticamente quando muda (se TTS estiver ligado)
  useEffect(() => {
    if (currentQuestion) {
      speak(currentQuestion.question)
    }
    // Move o foco para o card de pergunta para usuários de teclado
    if (questionRef.current) {
      questionRef.current.focus()
    }
  }, [quizState.currentQuestion])

  const handleNextQuestion = () => {
    const nextQuestionIndex = quizState.currentQuestion + 1
    const hasNextQuestion = nextQuestionIndex < quizState.questions.length
    dispatch({ type: "CHANGE_QUESTIONS" })
    if (hasNextQuestion) {
      dispatch({ type: "REORDER_OPTION" })
    }
  }

  const onSelectOption = (option) => {
    dispatch({
      type: "SELECT_OPTION",
      payload: { answer: currentQuestion.answer, option },
    })
    const isCorrect = option === currentQuestion.answer
    const feedback = isCorrect
      ? `Correct! ${currentQuestion.tip || ""}`
      : `Incorrect. The right answer is: ${currentQuestion.answer}. ${currentQuestion.tip || ""}`
    speak(feedback)
  }

  const handleSpeakQuestion = () => {
    const optionsList = currentQuestion.options.join(", ")
    speakOnce(`${currentQuestion.question}. Options: ${optionsList}`)
  }

  return (
    <div
      id="questions"
      role="main"
      aria-label={`Pergunta ${quizState.currentQuestion + 1} de ${quizState.questions.length}`}
    >
      <p
        ref={questionRef}
        tabIndex={-1}
        aria-live="polite"
        aria-atomic="true"
      >
        Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}
      </p>

      <h2 id="question-heading">{currentQuestion.question}</h2>

      <button
        className="speak-question-btn"
        onClick={handleSpeakQuestion}
        aria-label="Ouvir pergunta e opções em voz alta"
        title="Ouvir em voz alta"
      >
        🔊 Ouvir pergunta
      </button>

      {currentQuestion.tip && quizState.answerSelected && (
        <p className="question-tip" role="note" aria-label="Dica">
          💡 {currentQuestion.tip}
        </p>
      )}

      <div
        id="options-container"
        role="group"
        aria-labelledby="question-heading"
      >
        {currentQuestion.options.map((option) => (
          <Option
            key={option}
            option={option}
            answer={currentQuestion.answer}
            selectOption={() => onSelectOption(option)}
          />
        ))}
      </div>

      {quizState.answerSelected && (
        <button
          onClick={handleNextQuestion}
          aria-label="Ir para a próxima pergunta"
          autoFocus
        >
          Próximo
        </button>
      )}
    </div>
  )
}

export default Questions
