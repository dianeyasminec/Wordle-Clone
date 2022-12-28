import { useEffect, useState } from "react";
import Wordle from './components/Wordle'



function App() {

const [solution, setSolution] = useState(null)


  useEffect(()=>{
     fetch('  http://localhost:3001/solutions')
     .then(response =>{
      return response.json()
     })
     .then(data=> {
      // console.log(data)
      // random int between 0 & 14
      //Math.floor will floor decimal number 4.6 => 4
      //Math.random get a number etween 0-1
      const randomSolution = data[Math.floor(Math.random() * data.length)]
      setSolution(randomSolution.word)
     })
  },[setSolution])

  return (
    <div className="App">
     <h1 id="wordle">Wordle</h1>
     <p>Guess the Wordle in 6 tries. Each guess must be a valid 5-letter word. The color of the tiles will change to show how close your guess was to the word.</p>
     {solution && <Wordle solution={solution}/>}
    </div>
  );
}

export default App;
