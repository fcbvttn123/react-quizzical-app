export function AnswerButton(props) {
    return (
        <div className="answer-button">
            <input type="radio" id={props.id} name={props.name} value="Answer" />
            <label htmlFor={props.id}>Answer</label>
        </div>
    )
}