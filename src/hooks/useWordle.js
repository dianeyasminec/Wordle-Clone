import { useState } from "react"

const useWordle = (solution) =>{

    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([])  //each guess is an array
    const [history, setHistory] = useState(['hello'])  //each guess is a string 
    const [isCorrect, setIsCorrect] = useState(false)


// format a guess into an array of letter Objects
const formatGuess = () =>{
let solutionArray = [...solution]
let formattedGuess = [...currentGuess].map((l)=> {
    return {key:l, color:'grey'}
})
//find any green letter
formattedGuess.forEach((l,i)=>{
   if (solutionArray[i] === l.key){
    formattedGuess[i].color = 'green'
    solutionArray[i] = null
   }
})

// find any yellow color
formattedGuess.forEach((l,i)=>{
    if(solutionArray.includes(l.key) === l.key && l.color !== 'green'){
        formattedGuess[i].color = 'yellow'
        solutionArray[solutionArray.indexOf(l.key)] = null
    }
})
return formattedGuess
}
// Add new guess to the guesses state
//update the isCorrect state if the guess is correct 
//Add one to the turn state

const addNewGuess = ()=>{

}

//Handle keyup event & track current guess
//if user presses enter, add the new guess

const handleKeyup = ({key}) => {

    if(key === 'Enter'){
//Only add turn when guess is less than 5
if(turn > 5){
console.log('You used all your guess')
return
}
//Do not allow duplicate word
if(history.includes(currentGuess)){
console.log('you already tried that word')
return
}
//Chack if chars is 5 length long
if(currentGuess.length !== 5){
console.log('word must be 5 cas long')
return
}
const formatted = formatGuess()
console.log(formatted)

    }

if(key === 'Backspace'){
     setCurrentGuess((prev)=>{
        return prev.slice(0,-1)
    })
    return
}

//  console.log(key)
if(/^[A-Za-z]$/.test(key)){
    if(currentGuess.length < 5){
        setCurrentGuess((prev)=>{
            return prev + key
        })
    }
}
}


return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle;