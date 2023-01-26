import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      {props.value === 1 && (
        <div className="dot-grid">
          <div className="dot middle center"></div>
        </div>
      )}
      {props.value === 2 && (
        <div className="dot-grid">
          <div className="dot top left"></div>
          <div className="dot bottom right"></div>
        </div>
      )}
      {props.value === 3 && (
        <div className="dot-grid">
          <div className="dot top left"></div>
          <div className="dot middle center"></div>
          <div className="dot bottom right"></div>
        </div>
      )}
      {props.value === 4 && (
        <div className="dot-grid">
          <div className="dot left top"></div>
          <div className="dot left bottom"></div>
          <div className="dot right top"></div>
          <div className="dot right bottom"></div>
        </div>
      )}
      {props.value === 5 && (
        <div className="dot-grid">
          <div className="dot left top"></div>
          <div className="dot left bottom"></div>
          <div className="dot center middle"></div>
          <div className="dot right top"></div>
          <div className="dot right bottom"></div>
        </div>
      )}
      {props.value === 6 && (
        <div className="dot-grid">
          <div className="dot left top"></div>
          <div className="dot left middle"></div>
          <div className="dot left bottom"></div>
          <div className="dot right top"></div>
          <div className="dot right middle"></div>
          <div className="dot right bottom"></div>
        </div>
      )}
    </div>
  );
}
