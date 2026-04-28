import {useContext} from "react"
import { QuizContext } from '../context/quiz'
import "./PickLevel.css";

import React from 'react'

export const PickLevel = () => {
    const [quizState, dispatch] = useContext(QuizContext)

    function chooseCategoryQuestions(category){
        dispatch({type: "START_GAME", playload:category});

        dispatch({ type: "REORDER_QUESTIONS"});
    }



  return (
    <div id="category">

        <h2>ESCOLHA SEU NIVEL DE INGLÊS</h2>
        <p>As perguntas foram selecionados indicadas para o 
            seu nivel de inglês do mais basico até o mais avançado</p>
            <button
          onClick={() => chooseCategoryQuestions(question.category)}
          key={question.category}
        >
          {question.category}
        </button>
    </div>
  )
}

