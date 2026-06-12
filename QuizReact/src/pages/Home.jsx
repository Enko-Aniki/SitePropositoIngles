import "./LandingPageIngles.css";

const benefits = [
  {
    icon: "🆓",
    title: "Totalmente gratuito",
    description:
      "Sem taxas, sem mensalidades. O curso é um serviço à comunidade financiado pela igreja.",
  },
  {
    icon: "👥",
    title: "Turmas reduzidas",
    description:
      "Grupos pequenos para garantir atenção individual e um aprendizado mais efetivo.",
  },
  {
    icon: "⏰",
    title: "Horários acessíveis",
    description:
      "Aulas no período noturno e aos sábados para quem trabalha durante o dia.",
  },
  {
    icon: "📚",
    title: "Material incluso",
    description:
      "Apostilas e materiais didáticos fornecidos sem custo algum para o aluno.",
  },
  {
    icon: "🎓",
    title: "Certificado ao final",
    description:
      "Certificado de conclusão emitido para alunos que completam o curso.",
  },
  {
    icon: "❤️",
    title: "Ambiente acolhedor",
    description:
      "Um espaço seguro, respeitoso e encorajador para todos os níveis de aprendizado.",
  },
];

const testimonials = [
  {
    text: "Nunca imaginei que aprenderia inglês. O projeto mudou minha perspectiva profissional e pessoal. Os professores são incríveis!",
    name: "Maria Fernanda, moradora do bairro",
  },
  {
    text: "Consegui uma promoção no trabalho graças ao certificado do curso. E tudo de graça!",
    name: "João Paulo, ex-aluno",
  },
  {
    text: "Minha filha de 15 anos participa das turmas e está evoluindo muito.",
    name: "Rosângela, mãe de aluna",
  },
  {
    text: "Vim sem esperança de aprender e hoje consigo me comunicar em inglês básico.",
    name: "Sebastião, aposentado",
  },
];

const stats = [
  { number: "+300", label: "Alunos atendidos" },
  { number: "100%", label: "Gratuito" },
  { number: "2 anos", label: "De projeto social" },
];

export default function LandingPageIngles({ onInscrever }) {
  return (
    <div className="wrapper">
      <section className="hero-section">
        <div className="hero-card">
          <div className="hero-img">
            <span className="hero-img-icon">🌍</span>
            <span className="hero-img-title">
              Inglês gratuito para todos
            </span>
            <span className="hero-img-sub">
              Iniciativa da Igreja Batista
            </span>
          </div>

          <div>
            <span className="badge">
              Vagas limitadas — sem custo algum
            </span>

            <h2 className="hero-h2">Curso de Inglês Batista</h2>

            <p className="hero-p">
              Aprenda inglês com propósito. Um projeto social da nossa igreja
              para transformar vidas por meio do ensino gratuito de idiomas.
            </p>

            <div className="cta-group">
              <button
                className="btn-red"
                onClick={onInscrever}
              >
                Quero me inscrever
              </button>

              <button className="btn-out">
                Saiba mais
              </button>
            </div>

            <p className="hero-note">
              * Aberto à comunidade — não é necessário ser membro da igreja
            </p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-number">{s.number}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="who-section">
        <div className="who-card">
          <div>
            <h2 className="who-h2">Quem somos</h2>

            <p className="who-p">
              Somos uma comunidade batista comprometida com o serviço ao
              próximo.
            </p>

            <p className="who-p">
              Nossos professores são voluntários qualificados que acreditam
              que o conhecimento deve ser acessível a todos.
            </p>
          </div>

          <div className="who-icon">⛪</div>
        </div>
      </section>

      <section className="benefits-section">
        <h2 className="section-h2">O que oferecemos</h2>

        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <div key={i} className="ben-card">
              <span className="ben-icon">{b.icon}</span>
              <h3 className="ben-h3">{b.title}</h3>
              <p className="ben-p">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testi-section">
        <h2 className="section-h2">
          O que nossos alunos dizem
        </h2>

        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testi-card">
              <p className="testi-text">"{t.text}"</p>
              <span className="testi-name">— {t.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="final-section">
        <div className="final-card">
          <h2 className="final-h2">
            Inscrições abertas
          </h2>

          <p className="final-p">
            As vagas são limitadas e preenchidas por ordem de inscrição.
          </p>

          <button
            className="btn-red"
            onClick={onInscrever}
          >
            Garantir minha vaga grátis
          </button>
        </div>
      </section>

      <footer className="footer">
        <p>
          Igreja Batista · Projeto Social de Inglês · Todas as turmas são
          gratuitas e abertas à comunidade
        </p>
      </footer>
    </div>
  );
}