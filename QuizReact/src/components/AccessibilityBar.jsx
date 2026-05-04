import { useAccessibility } from "../context/AccessibilityContext"
import "./AccessibilityBar.css"

const AccessibilityBar = () => {
  const {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    ttsEnabled,
    setTtsEnabled,
    stopSpeaking,
    isSpeaking,
  } = useAccessibility()

  const handleFontChange = (delta) => {
    setFontSize((prev) => Math.min(24, Math.max(12, prev + delta)))
  }

  return (
    <div
      id="accessibility-bar"
      role="toolbar"
      aria-label="Barra de acessibilidade"
    >
      <span className="a11y-label" aria-hidden="true">Acessibilidade</span>

      {/* Text to Speech */}
      <div className="a11y-group" role="group" aria-label="Leitura em voz alta">
        <button
          className={`a11y-btn ${ttsEnabled ? "active" : ""}`}
          onClick={() => {
            if (ttsEnabled) stopSpeaking()
            setTtsEnabled((v) => !v)
          }}
          aria-pressed={ttsEnabled}
          title="Ativar leitura automática em voz alta"
        >
          <span aria-hidden="true">{ttsEnabled ? "🔊" : "🔇"}</span>
          <span className="a11y-btn-text">
            {ttsEnabled ? "TTS On" : "TTS Off"}
          </span>
        </button>

        {isSpeaking && (
          <button
            className="a11y-btn stop-btn"
            onClick={stopSpeaking}
            aria-label="Parar leitura"
            title="Parar leitura"
          >
            <span aria-hidden="true">⏹</span>
            <span className="a11y-btn-text">Parar</span>
          </button>
        )}
      </div>

      {/* Font Size */}
      <div className="a11y-group" role="group" aria-label="Tamanho da fonte">
        <button
          className="a11y-btn icon-btn"
          onClick={() => handleFontChange(-2)}
          aria-label="Diminuir fonte"
          title="Diminuir fonte"
          disabled={fontSize <= 12}
        >
          A-
        </button>
        <span className="font-indicator" aria-live="polite" aria-label={`Fonte ${fontSize}px`}>
          {fontSize}px
        </span>
        <button
          className="a11y-btn icon-btn"
          onClick={() => handleFontChange(2)}
          aria-label="Aumentar fonte"
          title="Aumentar fonte"
          disabled={fontSize >= 24}
        >
          A+
        </button>
      </div>

      {/* High Contrast */}
      <button
        className={`a11y-btn ${highContrast ? "active" : ""}`}
        onClick={() => setHighContrast((v) => !v)}
        aria-pressed={highContrast}
        title="Ativar modo de alto contraste"
      >
        <span aria-hidden="true">◑</span>
        <span className="a11y-btn-text">Contraste</span>
      </button>
    </div>
  )
}

export default AccessibilityBar
