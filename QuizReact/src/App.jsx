import './App.css'

// Components
import Header from './components/Header'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Midias from './pages/Midias'
import Sobre from './pages/Sobre'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Livros from './pages/Livros'
import Musicas from './pages/Musicas'

// Context
import { QuizContext } from './context/quiz'
import { DragContext } from './context/Drag_N_Drop'
import { HangmanContext } from './context/hangman'
import { AuthContext } from './context/auth'

// Hooks
import { useState, useEffect, useContext } from 'react'

function App() {
  const [activePage, setActivePage] = useState('home')
  const { dispatch: quizDispatch } = useContext(QuizContext)
  const { dispatch: dragDispatch } = useContext(DragContext)
  const { dispatch: hangmanDispatch } = useContext(HangmanContext)
  const { isAuthenticated, loading } = useContext(AuthContext)

  useEffect(() => {
    if (activePage !== 'quiz') {
      quizDispatch({ type: 'NEW_GAME' })
    }
  }, [activePage, quizDispatch])

  const handleNavigate = (page) => {
    if (activePage === 'quiz' && page !== 'quiz') {
      quizDispatch({ type: 'NEW_GAME' })
      dragDispatch({ type: 'NEW_DRAG_GAME' })
      hangmanDispatch({ type: 'NEW_HANGMAN' })
    }
    setActivePage(page)
  }

  // Show loading state while checking authentication
  if (loading) {
    return <div className="App loading">Loading...</div>
  }

  // If not authenticated, show only login page
  if (!isAuthenticated) {
    return (
      <div className="App">
        <Login />
      </div>
    )
  }

  return (
    <div className="App">
      <Header activePage={activePage} onNavigate={handleNavigate} />

      {activePage === 'home' && <Home onStartQuiz={() => setActivePage('quiz')} />}
      {activePage === 'quiz' && <Quiz />}
      {activePage === 'conteudo' && <Midias onNavigate={handleNavigate} />}
      {activePage === 'livros' && <Livros />}
      {activePage === 'musicas' && <Musicas />}
      {activePage === 'sobre' && <Sobre />}
      {activePage === 'admin' && <Admin />}
    </div>
  )
}

export default App