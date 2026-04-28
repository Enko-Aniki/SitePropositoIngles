import { useContext } from "react"
import { QuizContext } from '../context/quiz'
import "./PickLevel.css";

import React from 'react'

export const PickLevel = () => {
    const { state: quizState, dispatch } = useContext(QuizContext)

    function chooseCategoryQuestions(question) {
        dispatch({ type: "START_GAME", payload: question });

        dispatch({ type: "REORDER_QUESTIONS" });
    }

    return (
        <div id="category">

            <h2>ESCOLHA SEU NIVEL DE INGLÊS</h2>
            <p>As perguntas foram selecionados indicadas para o
                seu nivel de inglês do mais basico até o mais avançado</p>
           {quizState.questions.map((question) => (
                <button
                    onClick={() => chooseCategoryQuestions(question.questions)}
                    key={question.category}
                >
                    {question.category}
                </button>
            ))}
        </div>
    )
}


export default PickLevel