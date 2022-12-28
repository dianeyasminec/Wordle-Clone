import React, { useEffect, useState } from 'react'

export default function Keypad({usedKeys}) {
    const [letters, setLetters] = useState(null)

    useEffect(() =>{
        fetch('http://localhost:3001/letters')
        .then(response => response.json())
        .then(data =>{
            setLetters(data)
        })
    },[])
  return (
    <div className='keypad'>
     {letters && letters.map( l => {
    const color = usedKeys[l.key]
    return (
        <div key={l.key} className={color}>{l.key}</div>
    )
})}
    </div>
  )
}
