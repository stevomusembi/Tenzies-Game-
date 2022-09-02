import React, { useEffect, useState } from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

 
function App() {

const[dice, setDice]= useState(allNewDice());
const[tenzies, setTenzies]= useState(false);

//effect runs when dice state array changes
useEffect(()=>{
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value;
  const allSame = dice.every(die => die.value === firstValue)
  if(allHeld && allSame){
    setTenzies(true)
    console.log("You won!")
  }
},[dice])


//function generates random die no for the die face 
function generateNewDie(){
  return {
    value: Math.floor(Math.random()*6)+1, 
    isHeld: false, 
    id: nanoid()
  }
}
// function generates 10 new dice in an array
function allNewDice(){
    let newArray = [];
    for(let i=0; i<10; i++){
      newArray.push(generateNewDie());
    }
    return newArray
  }

//function hold die to not change when rolled
function holdDice(id){
  setDice(oldDice => oldDice.map(die => { 
    return die.id === id ? {...die, isHeld :!die.isHeld} : die
    }
  ))

}
  
const diceElement = dice.map(dice=> <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} hold={()=>holdDice(dice.id)}/>)

//roll dice function
function roll(){
  if(!tenzies){
    setDice(oldDice => oldDice.map(die =>{
      return die.isHeld ? die : generateNewDie()
    }))
  }else {
    setTenzies(false)
    setDice(allNewDice())
  }
}
  return (
      <main className='main'>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'> Roll until all die are the same. Click each die to freeze it at its current value between rolls</p>
      <div className='container'>
        {diceElement}
      </div>

    <button onClick={roll} className="roll-btn">{tenzies? "new game": "roll"}
    </button>
      </main>
  );
}

export default App;
