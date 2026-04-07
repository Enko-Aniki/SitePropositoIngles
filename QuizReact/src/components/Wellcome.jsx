import Quiz from "../img/quiz1.png";
import './Wellcome.css'
const Wellcome = () => {
  return (
    <div id="Quiz Ingles">
        <h2> Wellcome to quiz </h2>
        <p>Click on button to start</p>
        <img src={Quiz} alt="Quiz Begginig" />
        
        <button>Start</button>

    </div>
  )
}

export default Wellcome