import { useEffect, useState } from "react";
import { decode } from "html-entities";
let URL = "https://opentdb.com/api.php?amount=5&category=12&difficulty=medium&type=multiple"

export function QuizScreen(props) {
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        async function getQuestions() {
            try {
                let res = await fetch(URL)
                let data = await res.json()
                let quesArr = data.results
                quesArr && quesArr.length > 0 && quesArr.forEach(e => decodeInsertShuffle(e.question, e.correct_answer, e.incorrect_answers))
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        }
        getQuestions()
    }, [])
    function decodeInsertShuffle(question_to_be_decoded, correct_answer, incorrect_answers) {
        console.log(decode(question_to_be_decoded, {level: "html5"}))
        console.log(correct_answer)
        console.log(incorrect_answers)
    }
    return (
        <div className="quiz-screen">
            <h1>Quiz Screen</h1>
            <button onClick={props.switchScreen}>Play again</button>
        </div>
    )
}

