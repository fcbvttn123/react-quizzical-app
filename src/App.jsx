import { useState } from 'react'
import './App.css'

import { StartScreen } from "./components/StartScreen.jsx";
import { QuizScreen } from "./components/QuizScreen.jsx";

function App() {
  const [currentScreen, setCurrentScreen] = useState("StartScreen");
  function switchScreen() {
    setCurrentScreen(prev => prev == "StartScreen" ? "QuizScreen" : "StartScreen")
  }
  return (
    <div className="main">
      {
        /* Switch Screen conditionally */
        currentScreen == "StartScreen" ? 
          <StartScreen switchScreen={switchScreen}/> : 
          <QuizScreen switchScreen={switchScreen}/>
      }
    </div>
  )
}

export default App
