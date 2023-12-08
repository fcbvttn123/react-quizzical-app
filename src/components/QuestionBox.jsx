import { AnswerButton } from "./AnswerButton"

export function QuestionBox() {
    return (
        <div className="question-box">
            <h1>Lorem ipsum dolor sit amet ?</h1>
            <AnswerButton id="1" name={0}/>
            <AnswerButton id="2" name={0}/>
            <AnswerButton id="3" name={0}/>
            <AnswerButton id="4" name={0}/>
        </div>
    )
}