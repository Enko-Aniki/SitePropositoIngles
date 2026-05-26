import './Header.css'
import LogoImg from '../img/logo.jpeg'
import { useContext } from 'react'
import { AuthContext } from '../context/auth'

const navItems = [
  { key: 'home', label: 'Início' },
  { key: 'quiz', label: 'Quiz' },
  { key: 'conteudo', label: 'Conteúdo' },
  { key: 'sobre', label: 'Sobre nós' }
]

export default function Header({ activePage, onNavigate }) {
  const { user, logout } = useContext(AuthContext)

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
        </nav>

        <div className="header-user-info">
          <span className="user-name">{user?.username}</span>
          <button type="button" className="logout-btn" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
