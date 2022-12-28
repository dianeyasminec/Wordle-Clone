import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'

export default function Wordle({solution}) {

    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys} = useWordle(solution)

    useEffect(()=>{
        window.addEventListener('keyup', handleKeyup)

        if(isCorrect){
          console.log('you win!')
          window.removeEventListener('keyup',handleKeyup )
        }
        if(turn > 6){
          console.log('out of guesses')
          window.removeEventListener('keyup',handleKeyup )
        }

        return ()=> window.removeEventListener('keyup',handleKeyup )
    },[handleKeyup,isCorrect, turn])

   

  return (
    <>
    <div>solution word - {solution}</div>
    <div>current guess - {currentGuess}</div>
    <Grid currentGuess={currentGuess} turn={turn} guesses={guesses}/>
    <Keypad usedKeys={usedKeys}/>
    </>
  )
}
