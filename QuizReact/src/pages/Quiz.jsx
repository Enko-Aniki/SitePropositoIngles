import Questions from '../components/Questions'
import GameOver from '../components/GameOver'
import Wellcome from '../components/Wellcome'
import { PickLevel } from '../components/PickLevel'
import DragGame from '../components/DragGame'
import HangmanGame from '../components/HangmanGame'

import { QuizContext } from '../context/quiz'
import { DragContext } from '../context/Drag_N_Drop'
import { HangmanContext } from '../context/hangman'

import { useContext } from 'react'

export default function Quiz() {
  const { state: quizState } = useContext(QuizContext)
  const { state: dragState } = useContext(DragContext)
  const { state: hangmanState } = useContext(HangmanContext)

  return (
    <section id="quiz">
      {/* Tela inicial */}
      {quizState.gameStage === 'Start' && <Wellcome />}

      {/* PickLevel aparece só quando nenhum jogo está ativo */}
      {quizState.gameStage === 'Pick' &&
        dragState.gameStage === 'Pick' &&
        hangmanState.gameStage === 'Pick' && (
          <PickLevel />
        )}

      {/* Modo Quiz */}
      {quizState.gameStage === 'Playing' && <Questions />}
      {quizState.gameStage === 'End' && <GameOver />}

      {/* Modo Drag and Drop */}
      {dragState.gameStage === 'Playing' && <DragGame />}
      {dragState.gameStage === 'End' && <GameOver />}

      {/* Modo Forca */}
      {(hangmanState.gameStage === 'Playing' ||
        hangmanState.gameStage === 'Feedback') && (
          <HangmanGame />
        )}

      {hangmanState.gameStage === 'End' && <GameOver />}
    </section>
  )
}
