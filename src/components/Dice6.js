import React from "react"

export default function Dice6(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#fff" : "#000"
  }
  return (
    <div className="dice dice-face">
      <span className="dot" style={styles}></span>
      <span className="dot" style={styles}></span>
      <span className="dot" style={styles}></span>
      <span className="dot" style={styles}></span>
      <span className="dot" style={styles}></span>
      <span className="dot" style={styles}></span>


    </div>
  )
}