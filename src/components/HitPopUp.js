import React from "react";

export default function hitPopUp(props) {
  let color;
  props.hitOrMiss === "miss" ? (color = "yellow") : (color = "red");
  return (
    <div className="destroyedShips">
      {props.hitOrMiss === "miss" && props.winner === "none" && (
        <div className={color}>MISS</div>
      )}
      {props.hitOrMiss === "hit" && props.winner === "none" && (
        <div className={color}>HIT</div>
      )}
      {(props.winner === "computer" || props.winner === "player") && (
        <div className="gameover">GAME OVER</div>
      )}
      {props.winner === "player" && (
        <div className="nofather">
          Wow, you actually
          <span className="won"> won.</span>
        </div>
      )}
      {props.winner === "player" && (
        <div className="goodwork">Good work soldier.</div>
      )}
      {props.winner === "computer" && (
        <div>
          EVERYBODY IS DEAD. YOU <span className="loser">LOSE</span>
        </div>
      )}
      {props.currentPlayer === "player" && props.hitOrMiss === "miss" && (
        <div>Oh no! Your missile failed to hit an enemy ship</div>
      )}
      {props.currentPlayer === "player" &&
        props.hitOrMiss === "hit" &&
        props.lastShipSunk === "none" &&
        props.winner === "none" && (
          <div>Nice shot. You just fucked up an enemy ship.</div>
        )}
      {props.currentPlayer === "computer" && props.hitOrMiss === "miss" && (
        <div>You got lucky! the enemy missed</div>
      )}
      {props.currentPlayer === "computer" &&
        props.hitOrMiss === "hit" &&
        props.lastShipSunk === "none" && <div>Oh fuck! they got you!</div>}
      {props.currentPlayer === "computer" &&
        props.lastShipSunk === "destroyer" &&
        props.winner === "none" && (
          <div>The enemy has sunk your destroyer!</div>
        )}
      {props.currentPlayer === "computer" &&
        props.lastShipSunk === "submarine" &&
        props.winner === "none" && (
          <div>The enemy has sunk your submarine!</div>
        )}
      {props.currentPlayer === "computer" &&
        props.lastShipSunk === "cruiser" &&
        props.winner === "none" && <div>The enemy has sunk your cruiser!</div>}
      {props.currentPlayer === "computer" &&
        props.lastShipSunk === "battleship" &&
        props.winner === "none" && (
          <div>The enemy has sunk your battleship!</div>
        )}
      {props.currentPlayer === "computer" &&
        props.lastShipSunk === "carrier" &&
        props.winner === "none" && <div>The enemy has sunk your carrier!</div>}
      {props.currentPlayer === "player" &&
        props.lastShipSunk === "destroyer" &&
        props.winner === "none" && <div>You sunk an enemy destroyer!</div>}
      {props.currentPlayer === "player" &&
        props.lastShipSunk === "submarine" &&
        props.winner === "none" && <div>You sunk an enemy submarine!</div>}
      {props.currentPlayer === "player" &&
        props.lastShipSunk === "cruiser" &&
        props.winner === "none" && <div>You sunk an enemy cruiser!</div>}
      {props.currentPlayer === "player" &&
        props.lastShipSunk === "battleship" &&
        props.winner === "none" && <div>You sunk an enemy battleship!</div>}
      {props.currentPlayer === "player" &&
        props.lastShipSunk === "carrier" &&
        props.winner === "none" && <div>You sunk an enemy carrier!</div>}
      {props.winner === "none" && (
        <button className={color} onClick={props.onClick}>
          CONTINUE
        </button>
      )}
      {(props.winner === "player" || props.winner === "computer") && (
        <button
          className="restart"
          onClick={() => window.location.reload(false)}
        >
          RESTART
        </button>
      )}
    </div>
  );
}
