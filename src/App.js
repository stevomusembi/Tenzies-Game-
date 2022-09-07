import React, { useEffect, useState } from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

 
function App() {

const[dice, setDice]= useState(allNewDice());
const[tenzies, setTenzies]= useState(false);
const[rollNumber, setRollNumber]= useState(0);
const[highScore, setHighScore]= useState(JSON.parse(window.localStorage.getItem("highsccore")));

//use effect store no of rolls into local storage for call it your score
React.useEffect(() => {
  if(tenzies){
    if((highScore && (rollNumber < highScore)) || (highScore == null)){
      setHighScore(rollNumber)
      window.localStorage.setItem("highscore", JSON.stringify(highScore))
    }
  }
}, [tenzies])


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
    setRollNumber(oldRoll => oldRoll+1)
   
    
  }else {
      if( rollNumber<highScore){
        setHighScore(rollNumber)
      } else{
        setHighScore(highScore)
      }
    setTenzies(false)
    setDice(allNewDice())
    setRollNumber(0)
  }
  
  
}

  return (
      <main className='main'>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'> Roll until all the die are the same value.<br/> Click a die to freeze it at its current value between rolls</p>
      <div className='container'>
        {diceElement}
      </div>
      <p className='roll-no'>No of Rolls:{rollNumber} </p>
      <p className='roll-no'>High Score:{highScore}</p>


    <button onClick={roll} className="roll-btn">{tenzies? "New Game": "Roll Dice"}
    </button>
      </main>
  );
}

export default App;
