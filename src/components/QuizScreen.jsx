import { useEffect, useState } from "react";
import { decode } from "html-entities";
import { shuffleArray } from "./utilities/shuffleArray";
import { QuestionBox } from "./QuestionBox";
import { nanoid } from 'nanoid'
let URL = "https://opentdb.com/api.php?amount=5&category=12&difficulty=medium&type=multiple"

export function QuizScreen(props) {
    const [questions, setQuestions] = useState([])
    const [answersChecked, setAnswersChecked] = useState(false)
    function answerButtonOnClick(questionId, answerId) {
        setQuestions(prev => {
            return prev.map(question => {
                // Find the question that need to be updated of state
                if(question.question_id == questionId) {
                    // Find the answer button that need to be updated
                    let updatedAnswers = question.answers.map(answer => {
                        if(answer.answer_id == answerId) {
                            return {
                                ...answer,
                                beChosen: !answer.beChosen,
                                backgroundColor: "#94D7A2"
                            }
                        } else {
                            return {
                                ...answer,
                                beChosen: false,
                                backgroundColor: "white"
                            }
                        }
                    })
                    return {
                        ...question, 
                        answers: updatedAnswers
                    }
                } else {
                    return question
                }
            })
        })
    }
    function checkAnswers() {
        setQuestions(prev => prev.map(question => {
            let customAnswers = question.answers.map(answer => {
                // Change green background for all correct answers 
                if(answer.answer_value == question.correct_answer) {
                    return {
                        ...answer,
                        backgroundColor: "#94D7A2"
                    }
                // Other Answers
                } else {
                    // Chosen Answer
                    if(answer.beChosen) {
                        return {
                            ...answer,
                            backgroundColor: "#F8BCBC"
                        }
                    // Other Answers
                    } else {
                        return {...answer}
                    }
                }
            })
            return {
                ...question, 
                answers: customAnswers
            }
        }))
        setAnswersChecked(prev => !prev)
    }
    function resetGame() {
        getQuestions()
        setAnswersChecked(prev => !prev)
    }
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
                    beChosen: false,
                    backgroundColor: "white"
                }))
                return {
                    question_id: nanoid(),
                    question: decode(e.question, {level: "html5"}), 
                    correct_answer: decode(e.correct_answer, {level: "html5"}),
                    answers
                }
            }))
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }
    useEffect(() => {
        getQuestions()
    }, [])
    return (
        <div className="quiz-screen">
            <div className="all-questions">
                {questions.map(e => {
                    return <QuestionBox key={e.question_id} questionId={e.question_id} question={e.question} answers={e.answers} answerButtonOnClick={answerButtonOnClick} answersChecked={answersChecked}/>
                })}
            </div>
            <button className="check-answer-btn" onClick={answersChecked ? resetGame : checkAnswers}>{answersChecked ? "Play Again" : "Check Answers"}</button>
        </div>
    )
}

