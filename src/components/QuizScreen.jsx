import { useEffect, useState } from "react";
import { decode } from "html-entities";
import { shuffleArray } from "./utilities/shuffleArray";
import { QuestionBox } from "./QuestionBox";
import { nanoid } from 'nanoid'
let URL = "https://opentdb.com/api.php?amount=5&category=12&difficulty=medium&type=multiple"

export function QuizScreen(props) {
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        async function getQuestions() {
            try {
                let res = await fetch(URL)
                let data = await res.json()
                let quesArr = data.results
                quesArr && quesArr.length > 0 && setQuestions(quesArr.map(e => {
                    // Decode incorrect answer array
                    e.incorrect_answers = e.incorrect_answers.map(e => decode(e, {level: "html5"}))
                    // Add correct answer and Shuffle answers array 
                    let answers = shuffleArray([decode(e.correct_answer, {level: "html5"}), ...e.incorrect_answers])
                    // Update answers array
                    answers = answers.map(str => ({
                        answer_id: nanoid(), 
                        answer_value: str, 
                        beChosen: false
                    }))
                    return {
                        question_id: nanoid(),
                        question: decode(e.question, {level: "html5"}), 
                        correct_answer: e.correct_answer,
                        answers
                    }
                }))
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        }
        getQuestions()
    }, [])
    return (
        <div className="quiz-screen">
            <h1>Quiz Screen</h1>
            <div className="all-questions">
                {questions.map(e => {
                    return <QuestionBox key={e.question_id} questionId={e.question_id} question={e.question} answers={e.answers}/>
                })}
            </div>
            <button onClick={props.switchScreen}>Play again</button>
        </div>
    )
}

