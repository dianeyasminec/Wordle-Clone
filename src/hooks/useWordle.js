import { useState } from "react"

const useWordle = (solution) =>{

    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)])  //each guess is an array
    const [history, setHistory] = useState([])  //each guess is a string 
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})


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
    if(solutionArray.includes(l.key) && l.color !== 'green'){
        formattedGuess[i].color = 'yellow'
        solutionArray[solutionArray.indexOf(l.key)] = null
    }
})
return formattedGuess
}
// Add new guess to the guesses state
//update the isCorrect state if the guess is correct 
//Add one to the turn state

const addNewGuess = (formattedGuess) => {
    if(currentGuess === solution){
        setIsCorrect(true)
    }
    setGuesses(prevGuesses=>{
        let newGuesses = [...prevGuesses]
        newGuesses[turn] = formattedGuess
        return newGuesses
    })
setHistory(prevHistory =>{
return [...prevHistory, currentGuess]
})
setTurn((prevTurn)=>{
return prevTurn + 1
})
setUsedKeys((prevUsedKeys) =>{
    let newKeys = {...prevUsedKeys}

    formattedGuess.forEach((l) => {
     const currentColor = newKeys[l.key]

        if(l.color === 'green'){
            newKeys[l.key] = 'green'
            return
        }
         if(l.color === 'yellow' && currentColor !== 'green'){
            newKeys[l.key] = 'yellow'
            return
         }
         if(l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow'){
            newKeys[l.key] = 'grey'
            return
         }
    })
    return newKeys
})
setCurrentGuess('')
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
addNewGuess(formatted)

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
        setCurrentGuess(prev=>{
            return prev + key
        })
    }
}
}


return {turn, currentGuess, guesses, usedKeys, isCorrect, handleKeyup}
}

export default useWordle;