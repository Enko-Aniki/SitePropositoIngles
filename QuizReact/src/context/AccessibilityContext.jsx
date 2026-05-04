import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"

export const AccessibilityContext = createContext()

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16)
  const [highContrast, setHighContrast] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceRef = useRef(null)

  // Aplica tamanho de fonte no root
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
  }, [fontSize])

  // Aplica classe de alto contraste no body
  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast)
  }, [highContrast])

  const speak = useCallback((text, force = false) => {
    if (!window.speechSynthesis) return
    if (!ttsEnabled && !force) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [ttsEnabled])

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [])

  const speakOnce = useCallback((text) => {
    // Lê independente do toggle (para botão de leitura manual)
    speak(text, true)
  }, [speak])

  return (
    <AccessibilityContext.Provider value={{
      fontSize,
      setFontSize,
      highContrast,
      setHighContrast,
      ttsEnabled,
      setTtsEnabled,
      speak,
      speakOnce,
      stopSpeaking,
      isSpeaking,
    }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export const useAccessibility = () => useContext(AccessibilityContext)
