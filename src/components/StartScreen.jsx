export function StartScreen(props) {
    return (
        <div className="start-screen">
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={props.switchScreen}>Start quiz</button>
        </div>
    )
}