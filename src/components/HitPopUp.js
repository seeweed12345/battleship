import React from "react";

export default function hitPopUp(props) {
  return (
    <div>
      {props.hitOrMiss === "miss" && <div>MISS</div>}
      {props.hitOrMiss === "hit" && <div>HIT</div>}
      {props.currentPlayer === "player" && props.hitOrMiss === "miss" && (
        <div>Oh no! Your missile failed to hit an enemy ship</div>
      )}
      {props.currentPlayer === "player" && props.hitOrMiss === "hit" && (
        <div>Congratulations! You just fucked up an enemy ship</div>
      )}
      {props.currentPlayer === "computer" && props.hitOrMiss === "miss" && (
        <div>You got lucky! the enemy missed</div>
      )}
      {props.currentPlayer === "computer" && props.hitOrMiss === "hit" && (
        <div>Oh fuck! they got you!</div>
      )}
      <button onClick={props.onClick}>CONTINUE</button>
    </div>
  );
}
