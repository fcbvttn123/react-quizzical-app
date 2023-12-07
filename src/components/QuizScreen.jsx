export function QuizScreen(props) {
    return (
        <div className="quiz-screen">
            <h1>Quiz Screen</h1>
            <button onClick={props.switchScreen}>Play again</button>
        </div>
    )
}