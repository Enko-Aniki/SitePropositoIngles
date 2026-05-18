import './Midias.css'

export default function Midias() {
  return (
    <section className="midias-page">
      <div className="midias-card">
        <h2>Conteúdo</h2>
        <p>
          aqui voce pode ver conteudos de auxilio
        </p>

        <div className="midias-list">
          <div className="midias-item">
            <strong>Gramática</strong>
            <p>Estude as regras básicas e exemplos claros.</p>
          </div>
          <div className="midias-item">
            <strong>Conversação</strong>
            <p>Pratique frases e expressões úteis do dia a dia.</p>
          </div>
          <div className="midias-item">
            <strong>Vocabulário</strong>
            <p>Amplie seu repertório com palavras comuns em inglês.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
