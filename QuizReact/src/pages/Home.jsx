import './Home.css'

export default function Home({ onStartQuiz }) {
  return (
    <section id="home" className="home-section">
      <div className="home-card">
        <div className="home-image-placeholder">
          <span>Imagem do curso</span>
        </div>
        <div className="home-text-block">
          <h2>Bem-vindo ao Propósito Inglês</h2>
          <p>
            Aprenda inglês com atividades interativas e divertidas. Use o quiz para
            testar seu conhecimento e praticar o idioma de forma simples.
          </p>
          <button type="button" onClick={onStartQuiz} className="home-quiz-button">
            Ir para o Quiz
          </button>
        </div>
      </div>
    </section>
  )
}
