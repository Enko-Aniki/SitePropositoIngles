import './Footer.css'

export default function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica para enviar o e-mail
    alert('Obrigado por se inscrever! Em breve você receberá nossas dicas.')
    e.target.reset()
  }

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Coluna 1 - Sobre */}
          <div className="footer-column">
            <h3 className="footer-logo">Propósito Inglês</h3>
            <p className="footer-description">
              Transformando vidas através do inglês desde 2020. 
              Metodologia focada em conversação e resultados reais 
              para você alcançar a fluência.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Instagram">
                <span className="social-icon">📸</span>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <span className="social-icon">▶️</span>
              </a>
              <a href="#" className="social-link" aria-label="WhatsApp">
                <span className="social-icon">💬</span>
              </a>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div className="footer-column">
            <h4>Links Rápidos</h4>
            <ul className="footer-links">
              <li><a href="#home">Início</a></li>
              <li><a href="#benefits">Benefícios</a></li>
              <li><a href="#testimonials">Depoimentos</a></li>
              <li><a href="#quiz">Quiz de Nível</a></li>
            </ul>
          </div>

          {/* Coluna 3 - Cursos */}
          <div className="footer-column">
            <h4>Nossos Cursos</h4>
            <ul className="footer-links">
              <li><a href="#">Básico ao Avançado</a></li>
              <li><a href="#">Conversação</a></li>
              <li><a href="#">Inglês para Negócios</a></li>
              <li><a href="#">Preparatório TOEFL/IELTS</a></li>
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div className="footer-column">
            <h4>Contato</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📍</span>
                <span>Rua das Aulas, 123 - São Paulo, SP</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <span>(11) 99999-9999</span>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                <span>contato@propositoingles.com.br</span>
              </li>
              <li>
                <span className="contact-icon">🕐</span>
                <span>Seg-Sex: 8h às 22h</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h4>Receba dicas de inglês grátis</h4>
            <p>Inscreva-se para receber conteúdos exclusivos, dicas semanais e ofertas especiais.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="newsletter-input"
              required 
            />
            <button type="submit" className="newsletter-button">
              Inscrever
            </button>
          </form>
        </div>

        {/* Linha divisória e Copyright */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Propósito Inglês. Todos os direitos reservados.
            </p>
            <div className="footer-bottom-links">
              <a href="#">Política de Privacidade</a>
              <span className="separator">•</span>
              <a href="#">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}