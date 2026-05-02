import { useContext } from "react"
import { QuizContext } from '../context/quiz'
import { DragContext } from "../context/Drag_N_Drop";
import "./PickLevel.css";


export const PickLevel = () => {
  const { state: quizState, dispatch: quizDispatch } = useContext(QuizContext)
  const { state: dragState, dispatch: dragDispatch } = useContext(DragContext)

  return (
    <div id="category">
      <h2>ESCOLHA SEU NIVEL DE INGLÊS</h2>
      <p>Escolha o nível e o modo de jogo</p>

      <div id="mode-container">

        <div className="mode-box">
          <h3>🎯 Múltipla Escolha</h3>
          <p className="mode-desc">Escolha a alternativa correta</p>
          {quizState.categories.map((category) => (
            <button
              onClick={() => quizDispatch({ type: "START_GAME", payload: category.questions })}
              key={category.category}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="divider" />

        <div className="mode-box">
          <h3>🧩 Monte a Frase</h3>
          <p className="mode-desc">Arraste as palavras na ordem correta</p>
          {dragState.categories.map((category) => (
            <button
              onClick={() => dragDispatch({ type: "START_DRAG_GAME", payload: category.questions })}
              key={category.category}
            >
              {category.category}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default PickLevel