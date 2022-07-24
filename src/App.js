import "./App.css";
import React from "react";
import { nanoid } from "nanoid";
import Tile from "./components/Tile";

function App() {
  const [playerGrid, setPlayerGrid] = React.useState(newGrid());
  const [computerGrid, PlayerComputerGrid] = React.useState(newGrid());
  const [shipsPlaced, setShipsPlaced] = React.useState(0);
  // const [alreadyPlacedTiles, setAlreadyPlacedTiles] = React.useState([]);
  const [axis, setAxis] = React.useState("horizontal");

  function newGrid() {
    const newGrid = [];
    for (let i = 0; i < 100; i++) {
      newGrid.push({
        isShot: false,
        key: i,
        id: nanoid(),
        isShipPlaced: false,
      });
    }
    return newGrid;
  }
  function placeShip(tile) {
    if (shipsPlaced < 1) {
      placeDestroyer(tile, "destroyer");
      console.log("des");
      return;
    }
    if (shipsPlaced > 0 && shipsPlaced < 2) {
      placeSubmarine(tile, "submarine");
      console.log("sub");
      return;
    }
    if (shipsPlaced > 1 && shipsPlaced < 3) {
      placeCruiser(tile, "cruiser");
      console.log("cruis");
      return;
    }
  }

  function placeDestroyer(tile, shipType) {
    const position = tile;
    if (!position.isShipPlaced) {
      console.log("ship placed");
      let x;
      if (axis === "horizontal") {
        x = 1;
      } else {
        x = 10;
      }
      if (
        ((position.key + 1) % 10 === 0 && axis === "horizontal") ||
        (position.key + 1 > 90 && axis === "vertical")
      ) {
        alert("Ship is too close to the edge of the grid to be placed");
        return;
      } else {
        setShipsPlaced((old) => old + 1);
        const neighbor = position.key + x;
        setPlayerGrid((oldGrid) =>
          oldGrid.map((tile) => {
            return tile.key === position.key || tile.key === neighbor
              ? {
                  ...tile,
                  isShipPlaced: true,
                  shipType: shipType,
                }
              : tile;
          })
        );
      }
    } else {
      alert("ship placed");
    }
  }

  function placeSubmarine(tile, shipType) {
    let x;
    if (axis === "horizontal") {
      x = 1;
    } else {
      x = 10;
    }
    const position = tile;
    const neighbor1 = position.key + x;
    const neighbor2 = neighbor1 + x;
    if (
      playerGrid[neighbor1].isShipPlaced === true ||
      playerGrid[neighbor2].isShipPlaced === true
    ) {
      alert("ships cannot overlap");
      return;
    }
    if (!position.isShipPlaced) {
      if (
        ((position.key + 1) % 10 === 0 && axis === "horizontal") ||
        ((position.key + 1) % 10 === 9 && axis === "horizontal") ||
        (position.key + 1 > 80 && axis === "vertical")
      ) {
        alert("Ship is too close to the edge of the grid to be placed");
        return;
      } else {
        setShipsPlaced((old) => old + 1);
        setPlayerGrid((oldGrid) =>
          oldGrid.map((tile) => {
            return tile.key === position.key ||
              tile.key === neighbor1 ||
              tile.key === neighbor2
              ? {
                  ...tile,
                  isShipPlaced: true,
                  shipType: shipType,
                }
              : tile;
          })
        );
      }
    } else {
      alert("ship placed");
    }
  }

  function placeCruiser(tile, shipType) {
    let x;
    if (axis === "horizontal") {
      x = 1;
    } else {
      x = 10;
    }
    const position = tile;
    const neighbor1 = position.key + x;
    const neighbor2 = neighbor1 + x;
    if (
      playerGrid[neighbor1].isShipPlaced ||
      playerGrid[neighbor2].isShipPlaced
    ) {
      alert("ships cannot overlap");
      return;
    }
    if (!position.isShipPlaced) {
      if (
        ((position.key + 1) % 10 === 0 && axis === "horizontal") ||
        ((position.key + 1) % 10 === 9 && axis === "horizontal") ||
        (position.key + 1 > 80 && axis === "vertical")
      ) {
        alert("Ship is too close to the edge of the grid to be placed");
        return;
      } else {
        setShipsPlaced((old) => old + 1);
        setPlayerGrid((oldGrid) =>
          oldGrid.map((tile) => {
            return tile.key === position.key ||
              tile.key === neighbor1 ||
              tile.key === neighbor2
              ? {
                  ...tile,
                  isShipPlaced: true,
                  shipType: shipType,
                }
              : tile;
          })
        );
      }
    } else {
      alert("ship placed");
    }
  }

  function shootTile(id) {
    console.log(id);
  }

  function switchAxis() {
    setAxis((old) => (old === "horizontal" ? "vertical" : "horizontal"));
  }

  const gridElements = playerGrid.map((tile) => (
    <Tile
      key={tile.id}
      isShot={tile.isShot}
      id={tile.key}
      isShipPlaced={tile.isShipPlaced}
      axis={axis}
      onClick={
        playerGrid.isShipPlaced ? () => shootTile(tile) : () => placeShip(tile)
      }
    />
  ));
  return (
    <main>
      <div className="gridcontainer">{gridElements}</div>
      <button onClick={() => switchAxis()} className="axisbutton">
        Switch Axis
      </button>
    </main>
  );
}

export default App;
