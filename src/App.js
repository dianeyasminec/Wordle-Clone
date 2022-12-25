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
     <h1>Wordle</h1>
     {solution && <Wordle solution={solution}/>}
    </div>
  );
}

export default App;
