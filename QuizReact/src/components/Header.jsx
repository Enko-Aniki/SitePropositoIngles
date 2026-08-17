import './Header.css'
import LogoImg from '../img/logo.jpeg'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/auth'

const navItems = [
  { key: 'home', label: 'Início' },
  { key: 'quiz', label: 'Quiz' },
  { key: 'conteudo', label: 'Conteúdo' },
  { key: 'sobre', label: 'Sobre nós' }
]

export default function Header({ activePage, onNavigate }) {
  const { user, logout } = useContext(AuthContext)
  const [showVersiculo, setShowVersiculo] = useState(false)

  return (
    <header className="header-nav">
      <div className="header-inner">
        <div className="header-logo">
          <img src={LogoImg} alt="Logo" className="header-logo-image" />
          <div className="header-logo-text">
            <strong>Propósito Inglês</strong>
            <span>Navegue entre as páginas do curso</span>
          </div>
        </div>

        <nav className="nav-buttons">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={activePage === item.key ? 'active' : ''}
              onClick={() => onNavigate(item.key)}
            >
              {item.label}
            </button>
          ))}
          {user?.role === 'admin' && (
            <button
              type="button"
              className={activePage === 'admin' ? 'active' : ''}
              onClick={() => onNavigate('admin')}
            >
              ⚙️ Admin
            </button>
          )}
          
          {/* Botão do versículo integrado na navegação */}
          <button
            type="button"
            className={`versiculo-nav-btn ${showVersiculo ? 'active' : ''}`}
            onClick={() => setShowVersiculo(!showVersiculo)}
            aria-label="Versículo do dia"
            title="João 3:16"
          >
            📖
          </button>
        </nav>

        <div className="header-user-info">
          <span className="user-name">{user?.username}</span>
          <button type="button" className="logout-btn" onClick={logout}>
            Sair
          </button>
        </div>
      </div>

      {/* Versículo Bíblico - Expansível */}
      <div className={`versiculo-biblico ${showVersiculo ? 'versiculo-visible' : ''}`}>
        <div className="versiculo-inner">
          <button 
            className="versiculo-close"
            onClick={() => setShowVersiculo(false)}
            aria-label="Fechar versículo"
          >
            ✕
          </button>
          
          <div className="versiculo-grid">
            <div className="versiculo-card">
              <div className="versiculo-header">
                <span className="versiculo-badge">🇧🇷 Português</span>
                <span className="versiculo-ref">João 3:16 NVI</span>
              </div>
              <blockquote className="versiculo-texto">
                "Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, 
                para que todo aquele que nele crer não pereça, mas tenha a vida eterna."
              </blockquote>
            </div>

            <div className="versiculo-divider-vertical"></div>

            <div className="versiculo-card">
              <div className="versiculo-header">
                <span className="versiculo-badge">🇺🇸 English</span>
                <span className="versiculo-ref">John 3:16 NIV</span>
              </div>
              <blockquote className="versiculo-texto">
                "For God so loved the world that he gave his one and only Son, 
                that whoever believes in him shall not perish but have eternal life."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}