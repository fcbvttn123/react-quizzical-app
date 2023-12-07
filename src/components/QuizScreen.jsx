import { useEffect, useState } from "react";
let URL = "https://opentdb.com/api.php?amount=5&category=12&difficulty=medium&type=multiple"

export function QuizScreen(props) {
    const [questions, setQuestions] = useState([])
    function renderQuestionBoxComponents() {
        console.log("Render QuestionBox Components")
    }
    useEffect(() => {
        async function getQuestions() {
            try {
                let res = await fetch(URL)
                let data = await res.json()
                let quesArr = data.results
                setQuestions(quesArr)
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        }
        getQuestions()
    }, [])
    useEffect(() => {
        questions.length > 0 && renderQuestionBoxComponents()
    }, [questions])
    return (
        <div className="quiz-screen">
            <h1>Quiz Screen</h1>
            <button onClick={props.switchScreen}>Play again</button>
        </div>
    )
}

