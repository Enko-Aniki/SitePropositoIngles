import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import './Home.css';

const shortcuts = [
  {
    key: 'quiz',
    icon: '🎮',
    eyebrow: 'Aprenda jogando',
    title: 'Jogos',
    description:
      'Pratique inglês com quiz, desafios de palavras e jogo da forca.',
    action: 'Explorar jogos',
  },
  {
    key: 'perfil',
    icon: '👤',
    eyebrow: 'Acompanhe seu progresso',
    title: 'Meu perfil',
    description:
      'Confira sua pontuação, seus jogos concluídos e personalize seu perfil.',
    action: 'Acessar perfil',
  },
  {
    key: 'conteudo',
    icon: '📚',
    eyebrow: 'Continue aprendendo',
    title: 'Conteúdo',
    description:
      'Encontre materiais de apoio, livros e vídeos para estudar no seu ritmo.',
    action: 'Ver conteúdos',
  },
];

export default function Home({ onNavigate }) {
  const { user } = useContext(AuthContext);

  return (
    <main className="home-page">
      <section className="home-welcome" aria-labelledby="home-title">
        <div className="home-welcome-copy">
          <span className="home-kicker">PROPÓSITO INGLÊS</span>
          <h1 id="home-title">
            Olá, {user?.username || 'estudante'}!
          </h1>
          <p>
            O que você gostaria de fazer hoje? Escolha um caminho e continue
            sua jornada no inglês.
          </p>
        </div>
        <div className="home-welcome-art" aria-hidden="true">
          <span>Hi!</span>
          <span>🌎</span>
        </div>
      </section>

      <section className="home-verse" aria-label="Versículo bíblico">
        <div className="home-verse-card">
          <div className="home-verse-header">
            <span className="home-verse-language">🇧🇷 Português</span>
            <span className="home-verse-reference">João 3:16 NVI</span>
          </div>
          <blockquote>
            “Porque Deus tanto amou o mundo que deu o seu Filho Unigênito,
            para que todo aquele que nele crer não pereça, mas tenha a vida
            eterna.”
          </blockquote>
        </div>
        <div className="home-verse-divider" aria-hidden="true" />
        <div className="home-verse-card">
          <div className="home-verse-header">
            <span className="home-verse-language">🇺🇸 English</span>
            <span className="home-verse-reference">John 3:16 NIV</span>
          </div>
          <blockquote>
            “For God so loved the world that he gave his one and only Son,
            that whoever believes in him shall not perish but have eternal
            life.”
          </blockquote>
        </div>
      </section>

      <section className="home-shortcuts" aria-labelledby="shortcuts-title">
        <div className="home-section-heading">
          <div>
            <span className="home-kicker">SEU ESPAÇO DE APRENDIZADO</span>
            <h2 id="shortcuts-title">Acesse rapidamente</h2>
          </div>
          <p>Jogos, progresso e materiais em um só lugar.</p>
        </div>

        <div className="home-shortcut-grid">
          {shortcuts.map((shortcut) => (
            <button
              key={shortcut.key}
              type="button"
              className="home-shortcut-card"
              onClick={() => onNavigate(shortcut.key)}
            >
              <span className="home-shortcut-icon" aria-hidden="true">
                {shortcut.icon}
              </span>
              <span className="home-shortcut-eyebrow">
                {shortcut.eyebrow}
              </span>
              <span className="home-shortcut-title">{shortcut.title}</span>
              <span className="home-shortcut-description">
                {shortcut.description}
              </span>
              <span className="home-shortcut-action">
                {shortcut.action} <span aria-hidden="true">→</span>
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
