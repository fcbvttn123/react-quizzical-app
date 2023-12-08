export function QuestionBox(props) {
    let answerBox = props.answers.map(e => {
        return (
            <div className="answer-box__item" key={e.answer_id}>
                <input type="radio" name={props.questionId} id={e.answer_id} onChange={(e) => console.log(e.target)} />
                <label htmlFor={e.answer_id}>{e.answer_value}</label>
            </div>
        )
    })
    return (
        <div className="question-box" id={props.questionId}>
            <h1>{props.question}</h1>
            {answerBox}
        </div>
    )
}