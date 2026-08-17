import './Midias.css'

export default function Midias({ onNavigate }) {
  return (
    <section className="midias-page">
      <div className="midias-card">
        <h2>Conteúdo</h2>
        <p>
          aqui voce pode ver conteudos de auxilio
        </p>

        <div className="midias-list">
          <button 
            className="midias-item"
            onClick={() => onNavigate('musicas')}
          >
            <strong>Videos</strong>
            <p>Estude as regras básicas e exemplos claros de inglês via videos e musicas!.</p>
          </button>

          <button 
            className="midias-item"
            onClick={() => onNavigate('livros')}
          >
            <strong>Livros</strong>
            <p>Amplie seu repertório com palavras comuns em inglês com livros de inglês.</p>
          </button>
        </div>
      </div>
    </section>
  )
}
