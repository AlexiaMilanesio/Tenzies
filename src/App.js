import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./index.css";


export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  // Click count
  const [count, setCount] = React.useState(0);
  // Time count
  const [seconds, setSeconds] = React.useState(0);
  // localStorage
  const [bestTime, setBestTime] = React.useState(localStorage.getItem("best-time") || 999);


  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);


  // Timer
  React.useEffect(() => { 
    let currentTime;    
    if (!tenzies) {
      currentTime = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      return () => clearInterval(currentTime);
    } else {
      return () => clearInterval(currentTime);
    }
  }, [tenzies]);


  // localStorage
  React.useEffect(() => {
    if (tenzies) {
      if (bestTime > seconds) {
        setBestTime(seconds);
        localStorage.setItem("best-time", seconds);
      } else {
        localStorage.getItem("best-time");
      }
    }
  }, [tenzies, bestTime, seconds]);


  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }


  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }


  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      // Click count
      setCount((oldCount) => oldCount + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      // Re-start click count
      setCount(0);
      // Re-start timer
      setSeconds(0);
    }
  }


  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }


  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));


  return (
    <main>
      {tenzies && <Confetti />}

      <h1 className="title">Tenzies</h1>

      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <div className="dice-container">
        {diceElements}
      </div>

      <button className="roll-dice" onClick={rollDice} id="rollbtn">
        {tenzies ? "New Game" : "Roll"}
      </button>
      
      <div className="results">
        {tenzies && <h1 className="results-title">Results:</h1>}

        <div className="align-timer">
          <ion-icon name="timer-outline"></ion-icon>
          <p className="align-icon">
            {tenzies ? "Your time was:" : "Timer:"} {seconds} seconds
          </p>
        </div>

        {tenzies && (
          <div className="align-results">
            <div className="align-roll-count">
              <ion-icon name="dice-outline"></ion-icon>
              <p className="align-icon">
                You rolled: {count} {count > 1 ? "times" : "time"}
              </p>
            </div>

            <div className="align-personal-best">
              <ion-icon name="body-outline"></ion-icon>
              <p className="align-icon personal-best">
                Your personal best is: {bestTime} seconds
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
