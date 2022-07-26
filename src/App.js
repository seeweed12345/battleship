import "./App.css";
import React from "react";
import { nanoid } from "nanoid";
import Tile from "./components/Tile";
import battleship from "./images/shiplogo.png";
import useCallbackState from "./components/useCallbackState";
import ComputerTile from "./components/ComputerTile";

function App() {
  const [playerGrid, setPlayerGrid] = React.useState(newGrid());
  const [computerGrid, setComputerGrid] = useCallbackState(newGrid());
  const [allShipsPlaced, setAllShipsPlaced] = React.useState(false);
  const [allComputerShipsPlaced, setAllComputerShipsPlaced] =
    React.useState(false);
  // const [alreadyPlacedTiles, setAlreadyPlacedTiles] = React.useState([]);
  const [currentShip, setCurrentShip] = React.useState("destroyer");
  const [computerShipsPlaced, setComputerShipsPlaced] = React.useState(0);
  const [computerCurrentShip, setComputerCurrentShip] =
    React.useState("destroyer");
  const [axis, setAxis] = React.useState("horizontal");
  const [currentPlayer, setCurrentPlayer] = React.useState("player");

  function newGrid() {
    const newGrid = [];
    for (let i = 0; i < 100; i++) {
      newGrid.push({
        isShot: false,
        id: i,
        key: nanoid(),
        isShipPlaced: false,
      });
    }
    return newGrid;
  }
  function placeShip(tile) {
    if (currentShip === "destroyer" && !allShipsPlaced) {
      placeDestroyer(tile, currentShip);
    } else if (currentShip === "submarine" && !allShipsPlaced) {
      placeSubmarine(tile, currentShip);
      return;
    } else if (currentShip === "cruiser" && !allShipsPlaced) {
      placeCruiser(tile, currentShip);
    } else if (currentShip === "battleship" && !allShipsPlaced) {
      placeBattleShip(tile, currentShip);
    } else if (currentShip === "carrier" && !allShipsPlaced) {
      placeCarrier(tile, currentShip);
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
        ((position.id + 1) % 10 === 0 && axis === "horizontal") ||
        (position.id + 1 > 90 && axis === "vertical")
      ) {
        alert("Ship is too close to the edge of the grid to be placed");
        return;
      } else {
        setCurrentShip("submarine");
        const neighbor = position.id + x;
        setPlayerGrid((oldGrid) =>
          oldGrid.map((tile) => {
            return tile.id === position.id || tile.id === neighbor
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
        ((position.id + 1) % 10 === 0 && axis === "horizontal") ||
        ((position.id + 1) % 10 === 9 && axis === "horizontal") ||
        (position.id + 1 > 80 && axis === "vertical")
      ) {
        alert("Ship is too close to the edge of the grid to be placed");
        return;
      } else {
        const neighbor1 = position.id + x;
        const neighbor2 = neighbor1 + x;
        if (
          playerGrid[neighbor1].isShipPlaced ||
          playerGrid[neighbor2].isShipPlaced
        ) {
          alert("ships cannot overlap");
        } else {
          setCurrentShip("cruiser");
          setPlayerGrid((oldGrid) =>
            oldGrid.map((tile) => {
              return tile.id === position.id ||
                tile.id === neighbor1 ||
                tile.id === neighbor2
                ? {
                    ...tile,
                    isShipPlaced: true,
                    shipType: shipType,
                  }
                : tile;
            })
          );
        }
      }
    } else {
      alert("ship placed");
    }
  }

  function placeCruiser(tile, shipType) {
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
        ((position.id + 1) % 10 === 0 && axis === "horizontal") ||
        ((position.id + 1) % 10 === 9 && axis === "horizontal") ||
        (position.id + 1 > 80 && axis === "vertical")
      ) {
        alert("Ship is too close to the edge of the grid to be placed");
        return;
      } else {
        const neighbor1 = position.id + x;
        const neighbor2 = neighbor1 + x;
        if (
          playerGrid[neighbor1].isShipPlaced ||
          playerGrid[neighbor2].isShipPlaced
        ) {
          alert("ships cannot overlap");
        } else {
          setCurrentShip("battleship");
          setPlayerGrid((oldGrid) =>
            oldGrid.map((tile) => {
              return tile.id === position.id ||
                tile.id === neighbor1 ||
                tile.id === neighbor2
                ? {
                    ...tile,
                    isShipPlaced: true,
                    shipType: shipType,
                  }
                : tile;
            })
          );
        }
      }
    } else {
      alert("ship placed");
    }
  }

  function placeBattleShip(tile, shipType) {
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
        ((position.id + 1) % 10 === 0 && axis === "horizontal") ||
        ((position.id + 1) % 10 === 9 && axis === "horizontal") ||
        ((position.id + 1) % 10 === 8 && axis === "horizontal") ||
        (position.id + 1 > 70 && axis === "vertical")
      ) {
        alert("Ship is too close to the edge of the grid to be placed");
        return;
      } else {
        const neighbor1 = position.id + x;
        const neighbor2 = neighbor1 + x;
        const neighbor3 = neighbor2 + x;
        if (
          playerGrid[neighbor1].isShipPlaced ||
          playerGrid[neighbor2].isShipPlaced ||
          playerGrid[neighbor3].isShipPlaced ||
          playerGrid[neighbor3].isShipPlaced
        ) {
          alert("ships cannot overlap");
        } else {
          setCurrentShip("carrier");
          setPlayerGrid((oldGrid) =>
            oldGrid.map((tile) => {
              return tile.id === position.id ||
                tile.id === neighbor1 ||
                tile.id === neighbor2 ||
                tile.id === neighbor3
                ? {
                    ...tile,
                    isShipPlaced: true,
                    shipType: shipType,
                  }
                : tile;
            })
          );
        }
      }
    } else {
      alert("ship placed");
    }
  }

  function placeCarrier(tile, shipType) {
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
        ((position.id + 1) % 10 === 0 && axis === "horizontal") ||
        ((position.id + 1) % 10 === 9 && axis === "horizontal") ||
        ((position.id + 1) % 10 === 8 && axis === "horizontal") ||
        ((position.id + 1) % 10 === 7 && axis === "horizontal") ||
        (position.id + 1 > 60 && axis === "vertical")
      ) {
        alert("Ship is too close to the edge of the grid to be placed");
        return;
      } else {
        const neighbor1 = position.id + x;
        const neighbor2 = neighbor1 + x;
        const neighbor3 = neighbor2 + x;
        const neighbor4 = neighbor3 + x;
        if (
          playerGrid[neighbor1].isShipPlaced ||
          playerGrid[neighbor2].isShipPlaced ||
          playerGrid[neighbor3].isShipPlaced ||
          playerGrid[neighbor3].isShipPlaced ||
          playerGrid[neighbor4].isShipPlaced
        ) {
          alert("ships cannot overlap");
        } else {
          setAllShipsPlaced((prev) => !prev);
          setComputerShipsPlaced(1);
          setPlayerGrid((oldGrid) =>
            oldGrid.map((tile) => {
              return tile.id === position.id ||
                tile.id === neighbor1 ||
                tile.id === neighbor2 ||
                tile.id === neighbor3 ||
                tile.id === neighbor4
                ? {
                    ...tile,
                    isShipPlaced: true,
                    shipType: shipType,
                  }
                : tile;
            })
          );
        }
      }
    } else {
      alert("ship placed");
    }
  }

  function shootTile(tile) {
    tile.isShipPlaced ? shipHit(tile) : shipMiss(tile);
  }

  function shipHit(hitTile) {
    if (currentPlayer === "player") {
      const newArray = computerGrid.map((computerTile) => {
        return computerTile.id === hitTile.id
          ? {
              ...computerTile,
              isShot: true,
            }
          : computerTile;
      });
      setComputerGrid(newArray);
      console.log("hit");
    }
  }

  function shipMiss() {
    console.log("miss");
  }

  function switchAxis() {
    setAxis((old) => (old === "horizontal" ? "vertical" : "horizontal"));
  }

  function getRandomAxis() {
    const axis = ["horizontal", "vertical"];
    let randomAxis = axis[Math.floor(Math.random() * axis.length)];
    return randomAxis;
  }

  function getRandomTile() {
    const randomNumber = Math.floor(Math.random() * 100);
    const randomTile = computerGrid[randomNumber - 1];
    return randomTile;
  }

  function checkIsShipPlaced(
    shipType,
    randomAxis,
    position,
    neighbor1,
    neighbor2,
    neighbor3,
    neighbor4
  ) {
    if (shipType === "destroyer") {
      if (
        position.isShipPlaced ||
        ((position.id + 1) % 10 === 0 && randomAxis === "horizontal") ||
        (position.id + 1 > 90 && randomAxis === "vertical")
      ) {
        return true;
      } else {
        console.log("destroyer", position, neighbor1);
      }
    }
    if (shipType === "submarine" || shipType === "cruiser") {
      if (
        ((position.id + 1) % 10 === 0 && randomAxis === "horizontal") ||
        ((position.id + 1) % 10 === 9 && randomAxis === "horizontal") ||
        (position.id + 1 > 80 && randomAxis === "vertical") ||
        position.isShipPlaced ||
        computerGrid[neighbor1].isShipPlaced ||
        computerGrid[neighbor2].isShipPlaced
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (shipType === "battleship") {
      if (
        ((position.id + 1) % 10 === 0 && randomAxis === "horizontal") ||
        ((position.id + 1) % 10 === 9 && randomAxis === "horizontal") ||
        ((position.id + 1) % 10 === 8 && randomAxis === "horizontal") ||
        (position.id + 1 > 70 && randomAxis === "vertical") ||
        position.isShipPlaced ||
        computerGrid[neighbor1].isShipPlaced ||
        computerGrid[neighbor2].isShipPlaced ||
        computerGrid[neighbor3].isShipPlaced
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (shipType === "carrier") {
      if (
        ((position.id + 1) % 10 === 0 && randomAxis === "horizontal") ||
        ((position.id + 1) % 10 === 9 && randomAxis === "horizontal") ||
        ((position.id + 1) % 10 === 8 && randomAxis === "horizontal") ||
        ((position.id + 1) % 10 === 7 && randomAxis === "horizontal") ||
        (position.id + 1 > 60 && randomAxis === "vertical") ||
        position.isShipPlaced ||
        computerGrid[neighbor1].isShipPlaced ||
        computerGrid[neighbor2].isShipPlaced ||
        computerGrid[neighbor3].isShipPlaced ||
        computerGrid[neighbor4].isShipPlaced
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  React.useEffect(() => {
    const placeComputerDestroyer = () => {
      console.log("initiated");
      let randomAxis;
      let position;
      let x;
      let neighbor1;
      randomAxis = getRandomAxis();
      position = getRandomTile();
      if (randomAxis === "horizontal") {
        x = 1;
      } else {
        x = 10;
      }
      neighbor1 = position.id + x;
      if (checkIsShipPlaced("destroyer", randomAxis, position, neighbor1)) {
        placeComputerDestroyer("destroyer");
      } else {
        setComputerGrid((oldGrid) =>
          oldGrid.map((tile) => {
            return tile.id === position.id || tile.id === neighbor1
              ? {
                  ...tile,
                  isShipPlaced: true,
                  shipType: "destroyer",
                }
              : tile;
          })
        );
      }
    };
    const placeComputerSubmarine = () => {
      let randomAxis;
      let position;
      let x;
      let neighbor1;
      let neighbor2;
      randomAxis = getRandomAxis();
      position = getRandomTile();
      if (randomAxis === "horizontal") {
        x = 1;
      } else {
        x = 10;
      }
      neighbor1 = position.id + x;
      neighbor2 = neighbor1 + x;
      if (
        checkIsShipPlaced(
          "submarine",
          randomAxis,
          position,
          neighbor1,
          neighbor2
        )
      ) {
        placeComputerSubmarine("submarine");
      } else {
        setComputerCurrentShip("cruiser");
        setComputerGrid((oldGrid) =>
          oldGrid.map((tile) => {
            return tile.id === position.id ||
              tile.id === neighbor1 ||
              tile.id === neighbor2
              ? {
                  ...tile,
                  isShipPlaced: true,
                  shipType: "submarine",
                }
              : tile;
          })
        );
      }
    };
    const placeComputerCruiser = () => {
      let randomAxis;
      let position;
      let x;
      let neighbor1;
      let neighbor2;
      randomAxis = getRandomAxis();
      position = getRandomTile();
      if (randomAxis === "horizontal") {
        x = 1;
      } else {
        x = 10;
      }
      neighbor1 = position.id + x;
      neighbor2 = neighbor1 + x;
      if (
        checkIsShipPlaced("cruiser", randomAxis, position, neighbor1, neighbor2)
      ) {
        placeComputerCruiser("cruiser");
      } else {
        setComputerGrid((oldGrid) =>
          oldGrid.map((tile) => {
            return tile.id === position.id ||
              tile.id === neighbor1 ||
              tile.id === neighbor2
              ? {
                  ...tile,
                  isShipPlaced: true,
                  shipType: "cruiser",
                }
              : tile;
          })
        );
      }
    };
    const placeComputerBattleship = () => {
      let randomAxis;
      let position;
      let x;
      let neighbor1;
      let neighbor2;
      let neighbor3;
      randomAxis = getRandomAxis();
      position = getRandomTile();
      if (randomAxis === "horizontal") {
        x = 1;
      } else {
        x = 10;
      }
      neighbor1 = position.id + x;
      neighbor2 = neighbor1 + x;
      neighbor3 = neighbor2 + x;
      if (
        checkIsShipPlaced(
          "battleship",
          randomAxis,
          position,
          neighbor1,
          neighbor2,
          neighbor3
        )
      ) {
        placeComputerBattleship("battleship");
      } else {
        setComputerGrid((oldGrid) =>
          oldGrid.map((tile) => {
            return tile.id === position.id ||
              tile.id === neighbor1 ||
              tile.id === neighbor2 ||
              tile.id === neighbor3
              ? {
                  ...tile,
                  isShipPlaced: true,
                  shipType: "battleship",
                }
              : tile;
          })
        );
      }
    };
    const placeComputerCarrier = () => {
      let randomAxis;
      let position;
      let x;
      let neighbor1;
      let neighbor2;
      let neighbor3;
      let neighbor4;
      randomAxis = getRandomAxis();
      position = getRandomTile();
      if (randomAxis === "horizontal") {
        x = 1;
      } else {
        x = 10;
      }
      neighbor1 = position.id + x;
      neighbor2 = neighbor1 + x;
      neighbor3 = neighbor2 + x;
      neighbor4 = neighbor3 + x;
      if (
        checkIsShipPlaced(
          "carrier",
          randomAxis,
          position,
          neighbor1,
          neighbor2,
          neighbor3,
          neighbor4
        )
      ) {
        placeComputerCarrier("carrier");
      } else {
        setComputerGrid((oldGrid) =>
          oldGrid.map((tile) => {
            return tile.id === position.id ||
              tile.id === neighbor1 ||
              tile.id === neighbor2 ||
              tile.id === neighbor3 ||
              tile.id === neighbor4
              ? {
                  ...tile,
                  isShipPlaced: true,
                  shipType: "carrier",
                }
              : tile;
          })
        );
      }
    };
    if (computerShipsPlaced > 0 && computerShipsPlaced < 2) {
      placeComputerDestroyer();
      setComputerShipsPlaced(2);
      console.log(computerShipsPlaced);
    }
    if (computerShipsPlaced > 1 && computerShipsPlaced < 3) {
      placeComputerSubmarine();
      setComputerShipsPlaced(3);
      console.log(computerShipsPlaced);
    }
    if (computerShipsPlaced > 2 && computerShipsPlaced < 4) {
      placeComputerCruiser();
      setComputerShipsPlaced(4);
      console.log(computerShipsPlaced);
    }
    if (computerShipsPlaced > 3 && computerShipsPlaced < 5) {
      placeComputerBattleship();
      setComputerShipsPlaced(5);
      console.log(computerShipsPlaced);
    }
    if (computerShipsPlaced > 4 && computerShipsPlaced < 6) {
      placeComputerCarrier();
      setComputerShipsPlaced(6);
      console.log(computerShipsPlaced);
    }
    console.log(computerGrid);
  }, [computerGrid, computerShipsPlaced]);

  const playerGridElements = playerGrid.map((tile) => (
    <Tile
      key={tile.key}
      isShot={tile.isShot}
      id={tile.id}
      isShipPlaced={tile.isShipPlaced}
      axis={axis}
      onClick={
        allShipsPlaced ? () => console.log("lol") : () => placeShip(tile)
      }
    />
  ));
  const computerGridElements =
    computerGrid &&
    computerGrid.map((tile) => (
      <ComputerTile
        key={tile.key}
        isShot={tile.isShot}
        id={tile.id}
        onClick={() => shootTile(tile)}
      />
    ));
  return (
    <div className="main">
      <div className="left">
        <img src={battleship} alt="battleship logo" className="bslogo" />
        {!allShipsPlaced && (
          <div className="ship-placement">
            PLEASE PLACE YOUR
            <span className="ship-placement-ship">
              {" "}
              {currentShip.toUpperCase()}
            </span>
          </div>
        )}
        {allShipsPlaced && (
          <div className="choosetile">PLEASE SELECT A TARGET TO SHOOT</div>
        )}
        {!allShipsPlaced && (
          <button onClick={() => switchAxis()} className="axisbutton">
            Switch Axis
          </button>
        )}
      </div>
      <div className="right">
        <div className="gridcontainer">
          {!allShipsPlaced ? playerGridElements : computerGridElements}
        </div>
      </div>
    </div>
  );
}

export default App;
