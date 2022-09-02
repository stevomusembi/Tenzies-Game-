import React from "react"
import Dice1 from "./components/Dice1"
import Dice2 from "./components/Dice2"
import Dice3 from "./components/Dice3"
import Dice4 from "./components/Dice4"
import Dice5 from "./components/Dice5"
import Dice6 from "./components/Dice6"



export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <div className="dice"  style={styles}onClick={props.hold}>
        {props.value === 1 && <Dice1 isHeld={props.isHeld} />}
        {props.value === 2 && <Dice2 isHeld={props.isHeld} />}
        {props.value === 3 && <Dice3 isHeld={props.isHeld} />}
        {props.value === 4 && <Dice4 isHeld={props.isHeld} />}
        {props.value === 5 && <Dice5 isHeld={props.isHeld} />}
        {props.value === 6 && <Dice6 isHeld={props.isHeld} />}


        </div>

    )
}





