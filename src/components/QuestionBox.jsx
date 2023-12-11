export function QuestionBox(props) {
    let answerButtons = props.answers.map(e => {
      let dynamicStyle = {backgroundColor: e.backgroundColor}
        return (
          <div className="answer-buttons" key={e.answer_id}>
            <input
              type="radio"
              name={props.questionId}
              id={e.answer_id}
              onChange={() =>
                props.answerButtonOnClick(props.questionId, e.answer_id)
              }
              disabled={props.answersChecked}
            />
            <label htmlFor={e.answer_id} style={dynamicStyle}>
              {e.answer_value}
            </label>
          </div>
        );
    })
    return (
        <div className="question-box" id={props.questionId}>
            <h1>{props.question}</h1>
            <div className="answer-buttons-container">
              {answerButtons}
            </div>
        </div>
    )
}