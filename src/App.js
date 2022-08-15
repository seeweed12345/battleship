import "./App.css";
import React from "react";
import { nanoid } from "nanoid";
import Tile from "./components/Tile";
import battleship from "./images/shiplogo.png";
import useCallbackState from "./components/useCallbackState";
import ComputerTile from "./components/ComputerTile";
import HitPopUp from "./components/HitPopUp";

function App() {
  const [playerGrid, setPlayerGrid] = React.useState(newGrid());
  const [computerGrid, setComputerGrid] = useCallbackState(newGrid());
  const [displayGrid, setDisplayGrid] = React.useState();
  const [displayGridUpdated, setDisplayGridUpdated] = React.useState();
  const [hitOrMissDisplayGridUpdated, setHitOrMissDisplayGridUpdated] =
    React.useState();
  const [allShipsPlaced, setAllShipsPlaced] = React.useState(false);
  const [confirmAllShipsPlaced, setConfirmAllShipsPlaced] =
    React.useState(false);
  const [allComputerShipsPlaced, setAllComputerShipsPlaced] =
    React.useState(false);
  // const [alreadyPlacedTiles, setAlreadyPlacedTiles] = React.useState([]);
  const [currentShip, setCurrentShip] = React.useState("destroyer");
  const [computerShipsPlaced, setComputerShipsPlaced] = React.useState(0);
  const [axis, setAxis] = React.useState("horizontal");
  const [computerShotSent, setComputerShotSent] = React.useState(false);
  const [currentPlayer, setCurrentPlayer] = React.useState("player");
  const [showHitPopUp, setShowHitPopUp] = React.useState(false);
  const [startGame, setStartGame] = React.useState(false);
  const [playerShotSent, setPlayerShotSent] = React.useState(false);
  const [firstShot, setFirstShot] = React.useState(false);
  const [lastShipHit, setLastShipHit] = React.useState(false);
  const [reverseShot, setReverseShot] = React.useState(false);
  const [lastShipMiss, setLastShipMiss] = React.useState(false);
  const [originalTile, setOriginalTile] = React.useState();
  const [lastTile, setLastTile] = React.useState();
  const [hitOrMiss, setHitOrMiss] = React.useState();
  const [computerAxis, setComputerAxis] = React.useState("horizontal");
  const [updateComputerAxis, setUpdateComputerAxis] = React.useState(false);
  const [tilesHitOnComputerTurn, setTilesHitOnComputerTurn] = React.useState(0);
  const [computerShotDirectionForward, setComputerShotDirectionForward] =
    React.useState(true);
  const [computerShotReset, setComputerShotReset] = React.useState(true);
  const [updatedLastTile, setUpdatedLastTile] = React.useState(false);
  const [computerNeighborsMissed, setComputerNeighborsMissed] =
    React.useState(0);
  const [updatedRandomAxis, setUpdatedRandomAxis] = React.useState(false);
  const [computerTilesToPickFromArray, setComputerTilesToPickFromArray] =
    React.useState(Array.from(Array(100).keys()));
  const [
    updatedComputerShotDirectionForward,
    setUpdatedComputerShotDirectionForward,
  ] = React.useState(false);

  function newGrid() {
    const newGrid = [];
    for (let i = 0; i < 100; i++) {
      newGrid.push({
        row: i,
        isShot: false,
        isMissed: false,
        id: i,
        key: nanoid(),
        isShipPlaced: false,
      });
    }
    return newGrid;
  }

  React.useEffect(() => {
    if (!confirmAllShipsPlaced) {
      setConfirmAllShipsPlaced(true);
    }
  }, [confirmAllShipsPlaced, allShipsPlaced]);
  function placeShip(tile) {
    if (currentShip === "destroyer" && !allShipsPlaced && playerGrid) {
      placeDestroyer(tile, currentShip);
    } else if (currentShip === "submarine" && !allShipsPlaced && playerGrid) {
      placeSubmarine(tile, currentShip);
      return;
    } else if (currentShip === "cruiser" && !allShipsPlaced && playerGrid) {
      placeCruiser(tile, currentShip);
    } else if (currentShip === "battleship" && !allShipsPlaced && playerGrid) {
      placeBattleShip(tile, currentShip);
    } else if (currentShip === "carrier" && !allShipsPlaced && playerGrid) {
      placeCarrier(tile, currentShip);
    }
  }

  function placeDestroyer(tile, shipType) {
    const position = tile;
    if (!position.isShipPlaced) {
      let x;
      if (axis === "horizontal") {
        x = 1;
      } else {
        x = 10;
      }
      if (
        ((Number(position.id) + 1) % 10 === 0 && axis === "horizontal") ||
        (Number(position.id) + 1 > 90 && axis === "vertical")
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
      let x;
      if (axis === "horizontal") {
        x = 1;
      } else {
        x = 10;
      }
      if (
        ((Number(position.id) + 1) % 10 === 0 && axis === "horizontal") ||
        ((Number(position.id) + 1) % 10 === 9 && axis === "horizontal") ||
        (Number(position.id) + 1 > 80 && axis === "vertical")
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
      let x;
      if (axis === "horizontal") {
        x = 1;
      } else {
        x = 10;
      }
      if (
        ((Number(position.id) + 1) % 10 === 0 && axis === "horizontal") ||
        ((Number(position.id) + 1) % 10 === 9 && axis === "horizontal") ||
        (Number(position.id) + 1 > 80 && axis === "vertical")
      ) {
        alert("Ship is too close to the edge of the grid to be placed");
        return;
      } else {
        const neighbor1 = Number(position.id) + x;
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
              return tile.id === Number(position.id) ||
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
      let x;
      if (axis === "horizontal") {
        x = 1;
      } else {
        x = 10;
      }
      if (
        ((Number(position.id) + 1) % 10 === 0 && axis === "horizontal") ||
        ((Number(position.id) + 1) % 10 === 9 && axis === "horizontal") ||
        ((Number(position.id) + 1) % 10 === 8 && axis === "horizontal") ||
        (Number(position.id) + 1 > 70 && axis === "vertical")
      ) {
        alert("Ship is too close to the edge of the grid to be placed");
        return;
      } else {
        const neighbor1 = Number(position.id) + x;
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
              return tile.id === Number(position.id) ||
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
      let x;
      if (axis === "horizontal") {
        x = 1;
      } else {
        x = 10;
      }
      if (
        ((Number(position.id) + 1) % 10 === 0 && axis === "horizontal") ||
        ((Number(position.id) + 1) % 10 === 9 && axis === "horizontal") ||
        ((Number(position.id) + 1) % 10 === 8 && axis === "horizontal") ||
        ((Number(position.id) + 1) % 10 === 7 && axis === "horizontal") ||
        (Number(position.id) + 1 > 60 && axis === "vertical")
      ) {
        alert("Ship is too close to the edge of the grid to be placed");
        return;
      } else {
        const neighbor1 = Number(position.id) + x;
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
          setAllShipsPlaced(true);
          if (!allComputerShipsPlaced) {
            setComputerShipsPlaced(1);
          }
          setPlayerGrid((oldGrid) =>
            oldGrid.map((tile) => {
              return tile.id === Number(position.id) ||
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
    if (!firstShot) {
      setFirstShot(true);
    }
    console.log("tile hit", tile);
    currentPlayer === "player"
      ? setPlayerShotSent(true)
      : setComputerShotSent(true);
    if (tile.isShipPlaced) {
      shipHit(tile);
    } else if (!tile.isShipPlaced) {
      shipMiss(tile);
    }
    if (currentPlayer === "computer") {
      setComputerTilesToPickFromArray((prev) =>
        prev.filter((value) => value !== Number(tile.id))
      );
      console.log(computerTilesToPickFromArray);
    }
  }

  function resetPlayerShips() {
    setAllShipsPlaced(false);
    setCurrentShip("destroyer");
    setPlayerGrid(newGrid());
  }

  function shipHit(hitTile) {
    let missedGrid;
    let setGrid;
    if (currentPlayer === "player") {
      setHitOrMiss("hit");
      missedGrid = computerGrid;
      setGrid = setComputerGrid;
      setShowHitPopUp(true);
    } else if (currentPlayer === "computer") {
      setHitOrMiss("hit");
      missedGrid = playerGrid;
      setGrid = setPlayerGrid;
      setShowHitPopUp(true);
      console.log("hit captured");
      setTilesHitOnComputerTurn((prev) => prev + 1);
      setLastTile(Number(hitTile.id));
    }
    const newArray = missedGrid.map((computerTile) => {
      return computerTile.id === hitTile.id
        ? {
            ...computerTile,
            isShot: true,
          }
        : computerTile;
    });
    setGrid(newArray);
  }

  function shipMiss(missedTile) {
    let missedGrid;
    let setGrid;
    setHitOrMiss("miss");
    if (currentPlayer === "player") {
      missedGrid = computerGrid;
      setGrid = setComputerGrid;
      setShowHitPopUp(true);
    } else if (currentPlayer === "computer") {
      missedGrid = playerGrid;
      setGrid = setPlayerGrid;
      setShowHitPopUp(true);
      setComputerNeighborsMissed((prev) => prev);
      setLastTile(Number(missedTile.id));
    }
    const newArray = missedGrid.map((computerTile) => {
      return computerTile.id === missedTile.id
        ? {
            ...computerTile,
            isMissed: true,
          }
        : computerTile;
    });
    setGrid(newArray);
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

  function getRandomTileFromTilesToPickFromArray() {
    let randomTile =
      computerTilesToPickFromArray[
        Math.floor(Math.random() * computerTilesToPickFromArray.length)
      ];
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
    const changeDisplayGrid = () => {
      if (currentPlayer === "player") {
        setDisplayGrid(computerGridElements);
      } else {
        setDisplayGrid(playerGridElements);
      }
      setDisplayGridUpdated(true);
    };
    const hitOrMissDisplayGrid = () => {
      if (currentPlayer === "player") {
        setDisplayGrid(computerGridElements);
      } else {
        setDisplayGrid(playerGridElements);
      }
      setHitOrMissDisplayGridUpdated(true);
    };
    if (!hitOrMissDisplayGridUpdated && (playerShotSent || computerShotSent)) {
      hitOrMissDisplayGrid();
    }
    if (!displayGridUpdated && startGame) {
      if (currentPlayer === "player" || !firstShot) {
        changeDisplayGrid();
      } else if (currentPlayer === "computer") {
        changeDisplayGrid();
      }
    }
  }, [
    startGame,
    playerShotSent,
    computerShotSent,
    currentPlayer,
    displayGridUpdated,
    hitOrMissDisplayGridUpdated,
    firstShot,
    computerGrid,
    playerGrid,
    showHitPopUp,
    hitOrMiss,
  ]);
  React.useEffect(() => {
    const tileIsOnTheRightEdge = (tileNumber) => {
      if ((tileNumber + 1) % 10 === 0) {
        return true;
      }
    };
    const tileIsOnTheBottomEdge = (tileNumber) => {
      if (tileNumber + 1 > 90) {
        return true;
      }
    };
    const tileIsOnTheLeftEdge = (tileNumber) => {
      if ((tileNumber + 10) % 10 === 0) {
        return true;
      }
    };
    const tileIsOnTheTopEdge = (tileNumber) => {
      if (tileNumber + 1 < 10) {
        return true;
      }
    };
    const getRandomAxis = () => {
      const axis = ["horizontal", "vertical"];
      let randomAxis = axis[Math.floor(Math.random() * axis.length)];
      setComputerAxis("horizontal");
    };
    const toggleComputerShotAxis = () => {
      computerAxis === "vertical"
        ? setComputerAxis("horizontal")
        : setComputerAxis("vertical");
    };

    const getNeighborTiles = (tileNumber) => {
      let neighbors = {
        neighborRight: tileNumber + 1,
        neighborLeft: tileNumber - 1,
        neighborUp: tileNumber - 10,
        neighborDown: tileNumber + 10,
      };

      return neighbors;
    };
    const getNeighborTileAfterHit = (tileNumber) => {
      let neighbor;
      if (computerAxis === "vertical" && computerShotDirectionForward) {
        neighbor = tileNumber + 10;
        return neighbor;
      } else if (computerAxis === "vertical" && !computerShotDirectionForward) {
        neighbor = tileNumber - 10;
        return neighbor;
      } else if (
        computerAxis === "horizontal" &&
        computerShotDirectionForward
      ) {
        neighbor = tileNumber + 1;
        return neighbor;
      } else if (
        computerAxis === "horizontal" &&
        !computerShotDirectionForward
      ) {
        neighbor = tileNumber - 1;
        return neighbor;
      }
    };
    const shootRandomShip = () => {
      let randomTile = getRandomTileFromTilesToPickFromArray();
      shootTile(playerGrid[randomTile]);
      setOriginalTile(Number(playerGrid[randomTile].id));
    };

    const nextShot = () => {
      console.log(lastTile, "lasttile");
      console.log("ran");
      let neighbors = getNeighborTiles(lastTile);
      if (
        lastShipHit &&
        (tileIsOnTheLeftEdge(lastTile) ||
          tileIsOnTheRightEdge(lastTile) ||
          tileIsOnTheBottomEdge(lastTile) ||
          tileIsOnTheTopEdge(lastTile))
      ) {
        setComputerShotDirectionForward((prev) => !prev);
      } else if (
        tilesHitOnComputerTurn === 5 ||
        (tilesHitOnComputerTurn > 1 && lastShipMiss)
      ) {
        console.log("ran");
        console.log(neighbors);
      } else if (computerAxis === "horizontal") {
        let randomNumber = Math.floor(Math.random() * 2);
        let randomNeighbor;
        randomNumber === 1
          ? (randomNeighbor = Number(neighbors.neighborLeft))
          : (randomNeighbor = Number(neighbors.neighborRight));
        console.log(neighbors);
        console.log(lastTile);
        console.log(randomNeighbor);
        console.log("ran");
        console.log(neighbors);
        if (
          (!playerGrid[Number(neighbors.neighborLeft)].isShot ||
            !playerGrid[Number(neighbors.neighborLeft)].isMissed) &&
          (!playerGrid[Number(neighbors.neighborRight)].isShot ||
            !playerGrid[Number(neighbors.neighborRight)].isMissed)
        ) {
          console.log("ran");
          randomNeighbor === neighbors.neighborLeft
            ? setComputerShotDirectionForward(true)
            : setComputerShotDirectionForward(false);
          shootTile(playerGrid[Number(neighbors.neighborRight)]);
          console.log(neighbors);
        } else if (
          (!playerGrid[Number(neighbors.neighborLeft)].isShot ||
            !playerGrid[Number(neighbors.neighborLeft)].isMissed) &&
          (playerGrid[Number(neighbors.neighborRight)].isShot ||
            playerGrid[Number(neighbors.neighborRight)].isMissed)
        ) {
          console.log("ran");
          setComputerShotDirectionForward(false);
          shootTile(playerGrid[Number(neighbors.neighborLeft)]);
          console.log(neighbors);
        } else if (
          (!playerGrid[Number(neighbors.neighborRight)].isShot ||
            !playerGrid[Number(neighbors.neighborRight)].isMissed) &&
          (playerGrid[Number(neighbors.neighborLeft)].isShot ||
            playerGrid[Number(neighbors.neighborLeft)].isMissed)
        ) {
          console.log("ran");
          setComputerShotDirectionForward(true);
          shootTile(playerGrid[Number(neighbors.neighborRight)]);
          console.log(neighbors);
        } else {
          console.log("ran");
          toggleComputerShotAxis();
          nextShot();
          console.log(neighbors);
        }
      } else if (computerAxis === "vertical") {
        console.log("ran");
        let randomNumber = Math.floor(Math.random() * 2);
        let randomNeighbor;
        randomNumber === 1
          ? (randomNeighbor = Number(neighbors.neighborDown))
          : (randomNeighbor = Number(neighbors.neighborUp));
        console.log(neighbors);
        console.log(lastTile);
        console.log(randomNeighbor);
        if (
          (!playerGrid[Number(neighbors.neighborDown)].isShot ||
            !playerGrid[Number(neighbors.neighborDown)].isMissed) &&
          (!playerGrid[Number(neighbors.neighborUp)].isShot ||
            !playerGrid[Number(neighbors.neighborUp)].isMissed)
        ) {
          console.log("ran");
          randomNeighbor === neighbors.neighborDown
            ? setComputerShotDirectionForward(true)
            : setComputerShotDirectionForward(false);
          shootTile(playerGrid[randomNeighbor]);
          console.log(neighbors);
        } else if (
          (!playerGrid[Number(neighbors.neighborDown)].isShot ||
            !playerGrid[Number(neighbors.neighborDown)].isMissed) &&
          (playerGrid[Number(neighbors.neighborUp)].isShot ||
            playerGrid[Number(neighbors.neighborUp)].isMissed)
        ) {
          console.log("ran");
        } else if (
          (!playerGrid[Number(neighbors.neighborUp)].isShot ||
            !playerGrid[Number(neighbors.neighborUp)].isMissed) &&
          (playerGrid[Number(neighbors.neighborDown)].isShot ||
            playerGrid[Number(neighbors.neighborDown)].isMissed)
        ) {
          console.log("ran");
          setComputerShotDirectionForward(true);
          shootTile(playerGrid[Number(neighbors.neighborUp)]);
          console.log(neighbors);
        } else {
          console.log("ran");
          toggleComputerShotAxis();
          nextShot();
          console.log(neighbors);
        }
      }
    };
    if (
      currentPlayer === "computer" &&
      playerGrid &&
      computerGrid &&
      computerShotReset &&
      !computerShotSent
    ) {
      console.log("surprise bitches");
      getRandomAxis();
      setUpdatedRandomAxis(true);
      shootTile(playerGrid[22]);
      setComputerShotReset(false);
    } else if (
      currentPlayer === "computer" &&
      playerGrid &&
      computerGrid &&
      !computerShotReset &&
      !computerShotSent &&
      lastTile
    ) {
      console.log("ran next shot");
      nextShot();
    }
  }, [
    computerShotDirectionForward,
    currentPlayer,
    computerAxis,
    updatedRandomAxis,
    updateComputerAxis,
    lastTile,
    lastShipHit,
    lastShipMiss,
    computerShotSent,
    playerGrid,
    computerGrid,
    originalTile,
    computerShotReset,
    updatedComputerShotDirectionForward,
    computerTilesToPickFromArray,
    tilesHitOnComputerTurn,
  ]);

  // React.useEffect(() => {
  //   const tileIsOnTheRightEdge = (tileNumber) => {
  //     if ((tileNumber + 1) % 10 === 0) {
  //       return true;
  //     }
  //   };
  //   const tileIsOnTheBottomEdge = (tileNumber) => {
  //     if (tileNumber + 1 > 90) {
  //       return true;
  //     }
  //   };
  //   const tileIsOnTheLeftEdge = (tileNumber) => {
  //     if ((tileNumber + 10) % 10 === 0) {
  //       return true;
  //     }
  //   };
  //   const tileIsOnTheTopEdge = (tileNumber) => {
  //     if (tileNumber + 1 < 10) {
  //       return true;
  //     }
  //   };
  //   const getRandomAxis = () => {
  //     const axis = ["horizontal", "vertical"];
  //     let randomAxis = axis[Math.floor(Math.random() * axis.length)];
  //     setComputerAxis(randomAxis);
  //   };
  //   const reverseComputerShotAxis = () => {
  //     computerAxis === "vertical"
  //       ? setComputerAxis("horizontal")
  //       : setComputerAxis("vertical");
  //   };
  //   const reverseComputerShotDirection = () => {
  //     computerShotDirectionForward
  //       ? setComputerShotDirectionForward((prev) => !prev)
  //       : setComputerShotDirectionForward((prev) => !prev);
  //   };
  //   const getNeighborTile = (tileNumber) => {
  //     let neighbor;
  //     if (
  //       (computerAxis === "vertical" && computerShotDirectionForward) ||
  //       (tileIsOnTheTopEdge(originalTile) && computerAxis === "vertical")
  //     ) {
  //       neighbor = tileNumber + 10;
  //       return neighbor;
  //     } else if (
  //       computerAxis === "vertical" &&
  //       !computerShotDirectionForward &&
  //       !tileIsOnTheTopEdge(originalTile)
  //     ) {
  //       console.log("this ran");
  //       neighbor = tileNumber - 10;
  //       return neighbor;
  //     } else if (
  //       computerAxis === "horizontal" &&
  //       computerShotDirectionForward
  //     ) {
  //       neighbor = tileNumber + 1;
  //       console.log(neighbor);
  //       return neighbor;
  //     } else if (
  //       computerAxis === "horizontal" &&
  //       !computerShotDirectionForward
  //     ) {
  //       neighbor = tileNumber - 1;
  //       return neighbor;
  //     }
  //   };
  //   const shootRandomShip = () => {
  //     let randomTile = getRandomTileFromTilesToPickFromArray();
  //     shootTile(playerGrid[randomTile]);
  //     setOriginalTile(Number(playerGrid[randomTile].id));
  //   };
  //   const nextShot = () => {
  //     console.log(tilesHitOnComputerTurn);
  //     console.log(lastShipMiss);
  //     if (
  //       tilesHitOnComputerTurn === 5 ||
  //       (tilesHitOnComputerTurn > 1 && lastShipMiss)
  //     ) {
  //       setComputerShotReset(true);
  //       shootRandomShip();
  //     } else if (
  //       (updatedComputerShotDirectionForward && lastShipMiss) ||
  //       (updateComputerAxis && lastShipMiss && tilesHitOnComputerTurn === 1)
  //     ) {
  //       console.log("ran");
  //       let neighbor = getNeighborTile(originalTile);
  //       console.log(originalTile);
  //       console.log(neighbor, "neighbor");
  //       shootTile(playerGrid[neighbor]);
  //       setUpdatedComputerShotDirectionForward(false);
  //       setUpdateComputerAxis(false);
  //     } else if (lastTile === originalTile) {
  //       console.log("if no lasttile");
  //       let neighbor = getNeighborTile(originalTile);
  //       shootTile(playerGrid[neighbor]);
  //     } else if (lastTile !== originalTile) {
  //       console.log("not equal to last");
  //       let neighbor = getNeighborTile(lastTile);
  //       console.log(neighbor);
  //       shootTile(playerGrid[neighbor]);
  //     }
  //   };
  //   if (
  //     currentPlayer === "computer" &&
  //     playerGrid &&
  //     computerGrid &&
  //     computerShotReset &&
  //     !computerShotSent
  //   ) {
  //     getRandomAxis();
  //     shootTile(playerGrid[1]);
  //     setOriginalTile(Number(playerGrid[1].id));
  //     setComputerShotReset(false);
  //     setTilesHitOnComputerTurn(0);
  //   } else if (
  //     currentPlayer === "computer" &&
  //     playerGrid &&
  //     computerGrid &&
  //     !computerShotSent
  //   ) {
  //     console.log(lastShipMiss);
  //     console.log(tileIsOnTheRightEdge(originalTile));
  //     console.log(computerAxis);
  //     if (
  //       playerGrid &&
  //       !updateComputerAxis &&
  //       lastShipMiss &&
  //       tileIsOnTheRightEdge(originalTile) &&
  //       computerAxis === "horizontal"
  //     ) {
  //       reverseComputerShotAxis();
  //       setUpdateComputerAxis(true);
  //       console.log("update axis");
  //     } else if (
  //       (lastShipMiss &&
  //         tileIsOnTheTopEdge(originalTile) &&
  //         tileIsOnTheLeftEdge(originalTile)) ||
  //       (tileIsOnTheTopEdge(originalTile) &&
  //         tileIsOnTheRightEdge(originalTile)) ||
  //       (tileIsOnTheBottomEdge(originalTile) &&
  //         tileIsOnTheLeftEdge(originalTile)) ||
  //       (tileIsOnTheBottomEdge(originalTile) &&
  //         tileIsOnTheRightEdge(originalTile))
  //     ) {
  //       reverseComputerShotAxis();
  //       setUpdateComputerAxis(true);
  //     } else if (playerGrid && updateComputerAxis) {
  //       nextShot();
  //       console.log("updated axis confirmed");
  //     } else if (
  //       playerGrid &&
  //       !updatedComputerShotDirectionForward &&
  //       ((tileIsOnTheRightEdge(originalTile) &&
  //         computerAxis === "horizontal") ||
  //         tileIsOnTheBottomEdge(originalTile) ||
  //         tileIsOnTheRightEdge(lastTile) ||
  //         tileIsOnTheBottomEdge(lastTile))
  //     ) {
  //       reverseComputerShotDirection();
  //       setUpdatedComputerShotDirectionForward(true);
  //     } else if (
  //       playerGrid &&
  //       lastShipMiss &&
  //       !updatedComputerShotDirectionForward
  //     ) {
  //       reverseComputerShotDirection();
  //       setUpdatedComputerShotDirectionForward(true);
  //     } else if (
  //       playerGrid &&
  //       lastShipMiss &&
  //       updatedComputerShotDirectionForward
  //     ) {
  //       nextShot();
  //     } else if (!computerShotSent) {
  //       nextShot();
  //     }
  //     // } else if (lastShipMiss && !computerShotSent) {
  //     //   shootRandomShip();
  //     // }
  //     // } else if (currentPlayer === "computer" && playerGrid && computerGrid) {
  //     //   let neighborTile;
  //     //   if (Number(originalTile.id + (1 % 10) === 0) && lastShipMiss) {
  //     //     if (Number(originalTile.id) < 10) {
  //     //     }
  //     //   } else if (
  //     //     currentPlayer === "computer" &&
  //     //     lastShipHit &&
  //     //     !computerShotSent &&
  //     //     !lastShipMiss
  //     //   ) {
  //     //     console.log(lastTile.id);
  //     //     console.log("computer 1");
  //     //     if (!reverseShot) {
  //     //       neighborTile = Number(lastTile.id) + 1;
  //     //     } else {
  //     //       neighborTile = Number(lastTile.id) - 1;
  //     //     }

  //     //     console.log(neighborTile);
  //     //     shootTile(playerGrid[neighborTile]);
  //     //   } else if (
  //     //     currentPlayer === "computer" &&
  //     //     lastShipHit &&
  //     //     lastShipMiss &&
  //     //     !computerShotSent
  //     //   ) {
  //     //     console.log("computer 2");
  //     //     if (Number(lastTile.id + 1) % 1 === 0) {
  //     //       neighborTile = Number(originalTile.id) + 10;
  //     //     } else {
  //     //       neighborTile = Number(originalTile.id) - 1;
  //     //       console.log("changed neighbor");
  //     //     }
  //     //     console.log(neighborTile);
  //     //     shootTile(playerGrid[neighborTile]);
  //     //     setReverseShot(true);
  //     //   } else if (
  //     //     currentPlayer === "computer" &&
  //     //     !computerShotSent &&
  //     //     !originalTile
  //     //   ) {
  //     //     shootTile(playerGrid[0]);
  //     //     setOriginalTile(playerGrid[0]);
  //     //   }
  //   }
  // }, [
  //   computerShotDirectionForward,
  //   currentPlayer,
  //   computerAxis,
  //   updateComputerAxis,
  //   lastTile,
  //   lastShipHit,
  //   lastShipMiss,
  //   computerShotSent,
  //   playerGrid,
  //   computerGrid,
  //   originalTile,
  //   computerShotReset,
  //   updatedComputerShotDirectionForward,
  //   computerTilesToPickFromArray,
  //   tilesHitOnComputerTurn,
  // ]);

  // React.useEffect(() => {
  //   const lasTileIsOnTheRightEdge = (tile) => {
  //     Number(tile.id);
  //   };
  //   const ShootRandomShip = () => {
  //     let randomTile = getRandomTileComputer();
  //     shootTile(playerGrid[randomTile]);
  //     setOriginalTile(playerGrid[randomTile]);
  //   };
  //   const getRandomAxis = () => {
  //     const axis = ["horizontal", "vertical"];
  //     let randomAxis = axis[Math.floor(Math.random() * axis.length)];
  //     return randomAxis;
  //   };
  //   if (currentPlayer === "computer" && playerGrid && computerGrid) {
  //     let neighborTile;
  //     if (Number(originalTile.id + (1 % 10) === 0) && lastShipMiss) {
  //       if (Number(originalTile.id) < 10) {
  //       }
  //     }
  //     if (
  //       currentPlayer === "computer" &&
  //       lastShipHit &&
  //       !computerShotSent &&
  //       !lastShipMiss
  //     ) {
  //       console.log(lastTile.id);
  //       console.log("computer 1");
  //       if (!reverseShot) {
  //         neighborTile = Number(lastTile.id) + 1;
  //       } else {
  //         neighborTile = Number(lastTile.id) - 1;
  //       }

  //       console.log(neighborTile);
  //       shootTile(playerGrid[neighborTile]);
  //     } else if (
  //       currentPlayer === "computer" &&
  //       lastShipHit &&
  //       lastShipMiss &&
  //       !computerShotSent
  //     ) {
  //       console.log("computer 2");
  //       if (Number(lastTile.id + 1) % 1 === 0) {
  //         neighborTile = Number(originalTile.id) + 10;
  //       } else {
  //         neighborTile = Number(originalTile.id) - 1;
  //         console.log("changed neighbor");
  //       }
  //       console.log(neighborTile);
  //       shootTile(playerGrid[neighborTile]);
  //       setReverseShot(true);
  //     } else if (
  //       currentPlayer === "computer" &&
  //       !computerShotSent &&
  //       !originalTile
  //     ) {
  //       shootTile(playerGrid[0]);
  //       setOriginalTile(playerGrid[0]);
  //     }
  //   }
  // }, [
  //   currentPlayer,
  //   lastTile,
  //   lastShipHit,
  //   lastShipMiss,
  //   computerShotSent,
  //   playerGrid,
  //   computerGrid,
  //   originalTile,
  // ]);
  // React.useEffect(() => {
  //   if (selectedTile) {
  //     console.log("selected ran");
  //     shootTile(playerGrid[selectedTile]);
  //   }
  // }, [selectedTile]);
  // React.useEffect(() => {
  //   console.log(lastShipHit);
  //   if (currentPlayer === "computer" && lastShipHit) {
  //     const neighborTile = lastTile.id + 1;
  //     shootTile(playerGrid[neighborTile]);
  //   } else if (currentPlayer === "computer") {
  //     console.log("computer shot");
  //     let randomTile = getRandomTileComputer();
  //     shootTile(randomTile);
  //   }
  // }, [currentPlayer, lastTile, lastShipHit]);
  React.useEffect(() => {
    const placeComputerDestroyer = () => {
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
    }
    if (computerShipsPlaced > 1 && computerShipsPlaced < 3) {
      placeComputerSubmarine();
      setComputerShipsPlaced(3);
    }
    if (computerShipsPlaced > 2 && computerShipsPlaced < 4) {
      placeComputerCruiser();
      setComputerShipsPlaced(4);
    }
    if (computerShipsPlaced > 3 && computerShipsPlaced < 5) {
      placeComputerBattleship();
      setComputerShipsPlaced(5);
    }
    if (computerShipsPlaced > 4 && computerShipsPlaced < 6) {
      placeComputerCarrier();
      setAllComputerShipsPlaced(true);
      setComputerShipsPlaced(6);
    }
  }, [computerGrid, computerShipsPlaced]);

  const playerGridElements = playerGrid.map((tile) => (
    <Tile
      key={tile.key}
      isShot={tile.isShot}
      isMissed={tile.isMissed}
      id={tile.id}
      isShipPlaced={tile.isShipPlaced}
      axis={axis}
      onClick={allShipsPlaced ? () => null : () => placeShip(tile)}
    />
  ));
  const computerGridElements =
    computerGrid &&
    computerGrid.map((tile) => (
      <ComputerTile
        key={tile.key}
        isShot={tile.isShot}
        isMissed={tile.isMissed}
        id={tile.id}
        onClick={playerShotSent ? null : () => shootTile(tile)}
      />
    ));

  const playerHitPopUpElements = (
    <HitPopUp
      key={nanoid()}
      currentPlayer={currentPlayer}
      hitOrMiss={hitOrMiss}
      onClick={() => {
        currentPlayer === "player"
          ? setPlayerShotSent(false)
          : setComputerShotSent(false);
        setShowHitPopUp(false);
        setDisplayGridUpdated(false);
        setHitOrMissDisplayGridUpdated(false);
        currentPlayer === "player"
          ? setCurrentPlayer("computer")
          : setCurrentPlayer("player");
      }}
    />
  );

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
        {showHitPopUp
          ? playerHitPopUpElements
          : startGame &&
            currentPlayer === "player" && (
              <div className="choosetile">PLEASE SELECT A TARGET TO SHOOT</div>
            )}
        {!startGame && allShipsPlaced && (
          <button
            className="startGame"
            onClick={() => {
              setStartGame(true);
            }}
          >
            START GAME
          </button>
        )}
        {!startGame && allShipsPlaced && (
          <button
            className="resetplayerships"
            onClick={() => resetPlayerShips()}
          >
            RESET SHIPS
          </button>
        )}
        {!allShipsPlaced && (
          <button onClick={() => switchAxis()} className="axisbutton">
            Switch Axis
          </button>
        )}
      </div>
      <div className="right">
        <div className="gridcontainer">
          {startGame ? displayGrid : playerGridElements}
        </div>
      </div>
    </div>
  );
}

export default App;
