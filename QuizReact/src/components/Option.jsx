import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import './Options.css';

// Corrigido: selectOption com "O" maiúsculo para bater com o componente pai
const Option = ({ option, selectOption, answer }) => {
  const { state: quizState } = useContext(QuizContext);

  return (
    <div 
      // Lógica de CSS: se já respondeu, verifica se esta é a correta ou a errada
      className={`option 
        ${quizState.answerSelected && option === answer ? "correct" : ""} 
        ${quizState.answerSelected && option !== answer ? "wrong" : ""}
      `} 
      onClick={() => selectOption()}
    >
      <h3>{option}</h3>
    </div>
  );
};

export default Option;