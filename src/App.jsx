import { useState } from 'react'
import './App.css'

import { StartScreen } from "./components/StartScreen.jsx";
import { QuizScreen } from "./components/QuizScreen.jsx";

function App() {
  const [currentScreen, setCurrentScreen] = useState("startScreen");
  function switchScreen() {
    setCurrentScreen(prev => prev == "startScreen" ? "quizScreen" : "startScreen")
  }
  return (
    <div className="main">
      {currentScreen == "startScreen" ? <StartScreen /> : <QuizScreen />}
    </div>
  )
}

export default App
