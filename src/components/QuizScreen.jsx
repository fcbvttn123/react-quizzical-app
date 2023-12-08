import { useEffect, useState } from "react";
import { decode } from "html-entities";
import { shuffleArray } from "./utilities/shuffleArray";
import { QuestionBox } from "./QuestionBox";
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
                    e.incorrect_answers.push(e.correct_answer)
                    return {
                        question: decode(e.question, {level: "html5"}), 
                        answers: shuffleArray(e.incorrect_answers),
                        correct_answer: e.correct_answer
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
            <QuestionBox />
            <button onClick={props.switchScreen}>Play again</button>
        </div>
    )
}

