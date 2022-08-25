import "./App.css";
import React from "react";
import { nanoid } from "nanoid";
import Tile from "./components/Tile";
import battleship from "./images/shiplogo.png";
import useCallbackState from "./components/useCallbackState";
import ComputerTile from "./components/ComputerTile";
import HitPopUp from "./components/HitPopUp";

function App() {
  const [destroyerTilesHit, setDestroyerTilesHit] = React.useState({
    computer: 0,
    player: 0,
  });
  const [submarineTilesHit, setSubmarineTilesHit] = React.useState({
    computer: 0,
    player: 0,
  });
  const [cruiserTilesHit, setCruiserTilesHit] = React.useState({
    computer: 0,
    player: 0,
  });
  const [battleshipTilesHit, setBattleshipTilesHit] = React.useState({
    computer: 0,
    player: 0,
  });
  const [carrierTilesHit, setCarrierTilesHit] = React.useState({
    computer: 0,
    player: 0,
  });
  const [playerGrid, setPlayerGrid] = React.useState(newGrid());
  const [computerGrid, setComputerGrid] = useCallbackState(newGrid());
  const [displayGrid, setDisplayGrid] = React.useState();
  const [displayGridUpdated, setDisplayGridUpdated] = React.useState();
  const [hitOrMissDisplayGridUpdated, setHitOrMissDisplayGridUpdated] =
    React.useState();
  const [allShipsPlaced, setAllShipsPlaced] = React.useState(false);
  const [confirmAllShipsPlaced, setConfirmAllShipsPlaced] =
    React.useState(false);
  const [shipsSunk, setShipsSunk] = React.useState({
    player: {
      destroyer: false,
      submarine: false,
      cruiser: false,
      battleship: false,
      carrier: false,
    },
    computer: {
      destroyer: false,
      submarine: false,
      cruiser: false,
      battleship: false,
      carrier: false,
    },
  });
  const [sunkSubmarine, setSunkSubmarine] = React.useState(false);
  const [allComputerShipsPlaced, setAllComputerShipsPlaced] =
    React.useState(false);
  const [lastShotSunk, setLastShotSunk] = React.useState(false);
  const [d, setUpdatedLastShotSunk] = React.useState(false);
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
  const [lastShipSunk, setLastShipSunk] = React.useState("none");
  const [lastShipWasSunk, setLastShipWasSunk] = React.useState("none");
  const [lastShipMiss, setLastShipMiss] = React.useState(false);
  const [originalTile, setOriginalTile] = React.useState();
  const [lastTile, setLastTile] = React.useState();
  const [lastHitTile, setLastHitTile] = React.useState();
  const [hitOrMiss, setHitOrMiss] = React.useState();
  const [computerAxis, setComputerAxis] = React.useState("horizontal");
  const [updatedComputerAxis, setUpdatedComputerAxis] = React.useState(false);
  const [tilesHitOnComputerTurn, setTilesHitOnComputerTurn] = React.useState(0);
  const [winner, setWinner] = React.useState("none");
  const [updatedWinner, setUpdatedWinner] = React.useState(false);
  const [computerShotReset, setComputerShotReset] = React.useState(true);
  const [updatedLastTile, setUpdatedLastTile] = React.useState(false);
  const [computerNeighborsMissed, setComputerNeighborsMissed] =
    React.useState(0);
  const [verticalComputerNeighborsMissed, setVerticalComputerNeighborsMissed] =
    React.useState(0);
  const [
    horizontalComputerNeighborsMissed,
    setHorizontalComputerNeighborsMissed,
  ] = React.useState(0);
  const [computerTilesToPickFromArray, setComputerTilesToPickFromArray] =
    React.useState(Array.from(Array(100).keys()));

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
    if (tile.isMissed || tile.isShot) {
      return;
    }
    if (!firstShot) {
      setFirstShot(true);
    }
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
      if (hitTile.shipType === "destroyer") {
        setDestroyerTilesHit((prev) => {
          return {
            ...prev,
            player: destroyerTilesHit.player + 1,
          };
        });
      } else if (hitTile.shipType === "submarine") {
        setSubmarineTilesHit((prev) => {
          return {
            ...prev,
            player: submarineTilesHit.player + 1,
          };
        });
      } else if (hitTile.shipType === "cruiser") {
        setCruiserTilesHit((prev) => {
          return {
            ...prev,
            player: cruiserTilesHit.player + 1,
          };
        });
      } else if (hitTile.shipType === "battleship") {
        setBattleshipTilesHit((prev) => {
          return {
            ...prev,
            player: battleshipTilesHit.player + 1,
          };
        });
      } else if (hitTile.shipType === "carrier") {
        setCarrierTilesHit((prev) => {
          return {
            ...prev,
            player: carrierTilesHit.player + 1,
          };
        });
      }

      setShowHitPopUp(true);
    } else if (currentPlayer === "computer") {
      setHitOrMiss("hit");
      missedGrid = playerGrid;
      setGrid = setPlayerGrid;
      if (hitTile.shipType === "destroyer") {
        setDestroyerTilesHit((prev) => {
          return {
            ...prev,
            computer: destroyerTilesHit.computer + 1,
          };
        });
      } else if (hitTile.shipType === "submarine") {
        setSubmarineTilesHit((prev) => {
          return {
            ...prev,
            computer: submarineTilesHit.computer + 1,
          };
        });
      } else if (hitTile.shipType === "cruiser") {
        setCruiserTilesHit((prev) => {
          return {
            ...prev,
            computer: cruiserTilesHit.computer + 1,
          };
        });
      } else if (hitTile.shipType === "battleship") {
        setBattleshipTilesHit((prev) => {
          return {
            ...prev,
            computer: battleshipTilesHit.computer + 1,
          };
        });
      } else if (hitTile.shipType === "carrier") {
        setCarrierTilesHit((prev) => {
          return {
            ...prev,
            computer: carrierTilesHit.computer + 1,
          };
        });
      }

      setShowHitPopUp(true);

      setTilesHitOnComputerTurn((prev) => prev + 1);
      setLastShipHit(true);
      setLastShipMiss(false);
      setLastHitTile(Number(hitTile.id));
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
      computerAxis === "horizontal"
        ? setHorizontalComputerNeighborsMissed((prev) => prev + 1)
        : setVerticalComputerNeighborsMissed((prev) => prev + 1);
      setComputerNeighborsMissed((prev) => prev + 1);
      setLastShipHit(false);
      setLastShipMiss(true);
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
    console.log(updatedWinner);
    console.log(winner);
    let shipSunkByCurrentPlayer;
    currentPlayer === "player"
      ? (shipSunkByCurrentPlayer = shipsSunk.player)
      : (shipSunkByCurrentPlayer = shipsSunk.computer);
    console.log(shipSunkByCurrentPlayer);
    if (
      !updatedWinner &&
      shipSunkByCurrentPlayer.destroyer &&
      shipSunkByCurrentPlayer.submarine &&
      shipSunkByCurrentPlayer.cruiser &&
      shipSunkByCurrentPlayer.battleship &&
      shipSunkByCurrentPlayer.carrier
    ) {
      setWinner(currentPlayer);
      setUpdatedWinner(true);
    }
  }, [shipsSunk, updatedWinner, currentPlayer, winner]);
  React.useEffect(() => {
    console.log(lastShipSunk);
    console.log(currentPlayer);
    console.log(destroyerTilesHit.computer);
    console.log(shipsSunk.computer.destroyer);
    if (currentPlayer === "player") {
      if (!shipsSunk.player.destroyer && destroyerTilesHit.player === 2) {
        setLastShipSunk("destroyer");
        let newObj = {
          ...shipsSunk,
          player: { ...shipsSunk.player, destroyer: true },
        };
        setShipsSunk(newObj);
      }
      if (!shipsSunk.player.submarine && submarineTilesHit.player === 3) {
        setLastShipSunk("submarine");
        let newObj = {
          ...shipsSunk,
          player: { ...shipsSunk.player, submarine: true },
        };
        setShipsSunk(newObj);
      }
      if (!shipsSunk.player.cruiser && cruiserTilesHit.player === 3) {
        setLastShipSunk("cruiser");
        let newObj = {
          ...shipsSunk,
          player: { ...shipsSunk.player, cruiser: true },
        };
        setShipsSunk(newObj);
      }
      if (!shipsSunk.player.battleship && battleshipTilesHit.player === 4) {
        setLastShipSunk("battleship");
        let newObj = {
          ...shipsSunk,
          player: { ...shipsSunk.player, battleship: true },
        };
        setShipsSunk(newObj);
      }
      if (!shipsSunk.player.carrier && carrierTilesHit.player === 5) {
        setLastShipSunk("carrier");
        let newObj = {
          ...shipsSunk,
          player: { ...shipsSunk.player, carrier: true },
        };
        setShipsSunk(newObj);
      }
    }
    if (currentPlayer === "computer") {
      if (!shipsSunk.computer.destroyer && destroyerTilesHit.computer === 2) {
        setLastShipSunk("destroyer");
        setLastShipWasSunk(true);
        let newObj = {
          ...shipsSunk,
          computer: { ...shipsSunk.computer, destroyer: true },
        };
        setShipsSunk(newObj);
      }
      if (!shipsSunk.computer.submarine && submarineTilesHit.computer === 3) {
        setLastShipSunk("submarine");
        setLastShipWasSunk(true);
        let newObj = {
          ...shipsSunk,
          computer: { ...shipsSunk.computer, submarine: true },
        };
        setShipsSunk(newObj);
      }
      if (!shipsSunk.computer.cruiser && cruiserTilesHit.computer === 3) {
        setLastShipSunk("cruiser");
        setLastShipWasSunk(true);
        let newObj = {
          ...shipsSunk,
          computer: { ...shipsSunk.computer, cruiser: true },
        };
        setShipsSunk(newObj);
      }
      if (!shipsSunk.computer.battleship && battleshipTilesHit.computer === 4) {
        setLastShipSunk("battleship");
        setLastShipWasSunk(true);
        let newObj = {
          ...shipsSunk,
          computer: { ...shipsSunk.computer, battleship: true },
        };
        setShipsSunk(newObj);
      }
      if (!shipsSunk.computer.carrier && carrierTilesHit.computer === 5) {
        setLastShipSunk("carrier");
        setLastShipWasSunk(true);
        let newObj = {
          ...shipsSunk,
          computer: { ...shipsSunk.computer, carrier: true },
        };
        setShipsSunk(newObj);
      }
    }
  }, [
    lastShipSunk,
    destroyerTilesHit,
    submarineTilesHit,
    cruiserTilesHit,
    battleshipTilesHit,
    carrierTilesHit,
    shipsSunk,
    currentPlayer,
  ]);
  React.useEffect(() => {
    const tileIsOnTheRightEdge = (tileNumber) => {
      if ((tileNumber + 1) % 10 === 0) {
        return true;
      }
    };
    const tileIsOnTheBottomEdge = (tileNumber) => {
      if (tileNumber >= 90) {
        return true;
      }
    };
    const tileIsOnTheLeftEdge = (tileNumber) => {
      if ((tileNumber + 10) % 10 === 0) {
        return true;
      }
    };
    const tileIsOnTheTopEdge = (tileNumber) => {
      if (tileNumber <= 10) {
        return true;
      }
    };
    const tileIsOnTheTopLeftEdge = (tileNumber) => {
      if (tileIsOnTheTopEdge(tileNumber) && tileIsOnTheLeftEdge(tileNumber)) {
        return true;
      }
    };
    const tileIsOnTheTopRightEdge = (tileNumber) => {
      if (tileIsOnTheTopEdge(tileNumber) && tileIsOnTheRightEdge(tileNumber)) {
        return true;
      }
    };
    const tileIsOnTheBottomLeftEdge = (tileNumber) => {
      if (
        tileIsOnTheBottomEdge(tileNumber) &&
        tileIsOnTheLeftEdge(tileNumber)
      ) {
        return true;
      }
    };
    const tileIsOnTheBottomRightEdge = (tileNumber) => {
      if (
        tileIsOnTheBottomEdge(tileNumber) &&
        tileIsOnTheRightEdge(tileNumber)
      ) {
        return true;
      }
    };
    const getRandomAxis = () => {
      const axis = ["horizontal", "vertical"];
      let randomAxis = axis[Math.floor(Math.random() * axis.length)];
      return randomAxis;
    };
    const toggleComputerShotAxis = () => {
      computerAxis === "vertical"
        ? setComputerAxis("horizontal")
        : setComputerAxis("vertical");
    };

    const getNeighborTiles = (tileNumber) => {
      let neighbors;

      if (tileIsOnTheTopLeftEdge(tileNumber)) {
        neighbors = {
          neighborRight: tileNumber + 1,
          neighborLeft: tileNumber + 1,
          neighborUp: tileNumber + 10,
          neighborDown: tileNumber + 10,
        };
      } else if (tileIsOnTheTopRightEdge(tileNumber)) {
        neighbors = {
          neighborRight: tileNumber - 1,
          neighborLeft: tileNumber - 1,
          neighborUp: tileNumber + 10,
          neighborDown: tileNumber + 10,
        };
      } else if (tileIsOnTheTopLeftEdge(tileNumber)) {
        neighbors = {
          neighborRight: tileNumber + 1,
          neighborLeft: tileNumber + 1,
          neighborUp: tileNumber + 10,
          neighborDown: tileNumber + 10,
        };
      } else if (tileIsOnTheBottomLeftEdge(tileNumber)) {
        neighbors = {
          neighborRight: tileNumber + 1,
          neighborLeft: tileNumber + 1,
          neighborUp: tileNumber - 10,
          neighborDown: tileNumber - 10,
        };
      } else if (tileIsOnTheBottomRightEdge(tileNumber)) {
        neighbors = {
          neighborRight: tileNumber - 1,
          neighborLeft: tileNumber - 1,
          neighborUp: tileNumber - 10,
          neighborDown: tileNumber - 10,
        };
      } else if (tileIsOnTheBottomEdge(tileNumber)) {
        neighbors = {
          neighborRight: tileNumber + 1,
          neighborLeft: tileNumber - 1,
          neighborUp: tileNumber - 10,
          neighborDown: tileNumber - 10,
        };
      } else if (tileIsOnTheRightEdge(tileNumber)) {
        neighbors = {
          neighborRight: tileNumber - 1,
          neighborLeft: tileNumber - 1,
          neighborUp: tileNumber - 10,
          neighborDown: tileNumber + 10,
        };
      } else if (tileIsOnTheLeftEdge(tileNumber)) {
        neighbors = {
          neighborRight: tileNumber + 1,
          neighborLeft: tileNumber + 1,
          neighborUp: tileNumber - 10,
          neighborDown: tileNumber + 10,
        };
      } else {
        neighbors = {
          neighborRight: tileNumber + 1,
          neighborLeft: tileNumber - 1,
          neighborUp: tileNumber - 10,
          neighborDown: tileNumber + 10,
        };
      }
      return neighbors;
    };
    const shootRandomShip = () => {
      getRandomAxis();
      let randomTile = getRandomTileFromTilesToPickFromArray();
      setOriginalTile(randomTile);
      setLastShipWasSunk(false);
      setComputerNeighborsMissed(0);
      setTilesHitOnComputerTurn(0);
      setHorizontalComputerNeighborsMissed(0);
      setVerticalComputerNeighborsMissed(0);
      setUpdatedComputerAxis(false);
      setUpdatedLastTile(false);
      shootTile(playerGrid[randomTile]);
    };

    const nextShot = () => {
      let neighbors = getNeighborTiles(lastTile);
      if (computerAxis === "horizontal") {
        let randomNumber = Math.floor(Math.random() * 2);
        let randomNeighbor;
        randomNumber === 1
          ? (randomNeighbor = Number(neighbors.neighborLeft))
          : (randomNeighbor = Number(neighbors.neighborRight));

        if (
          (lastShipMiss && tilesHitOnComputerTurn === 0) ||
          (tilesHitOnComputerTurn > 1 &&
            horizontalComputerNeighborsMissed === 2) ||
          tilesHitOnComputerTurn === 5 ||
          lastShipWasSunk
        ) {
          shootRandomShip();
        } else if (
          !playerGrid[Number(neighbors.neighborLeft)].isShot &&
          !playerGrid[Number(neighbors.neighborLeft)].isMissed &&
          !playerGrid[Number(neighbors.neighborRight)].isShot &&
          !playerGrid[Number(neighbors.neighborRight)].isMissed
        ) {
          shootTile(playerGrid[randomNeighbor]);
        } else if (
          !playerGrid[Number(neighbors.neighborLeft)].isShot &&
          !playerGrid[Number(neighbors.neighborLeft)].isMissed &&
          (playerGrid[Number(neighbors.neighborRight)].isShot ||
            playerGrid[Number(neighbors.neighborRight)].isMissed)
        ) {
          shootTile(playerGrid[Number(neighbors.neighborLeft)]);
        } else if (
          !playerGrid[Number(neighbors.neighborRight)].isShot &&
          !playerGrid[Number(neighbors.neighborRight)].isMissed &&
          (playerGrid[Number(neighbors.neighborLeft)].isShot ||
            playerGrid[Number(neighbors.neighborLeft)].isMissed)
        ) {
          shootTile(playerGrid[Number(neighbors.neighborRight)]);
        } else {
          shootRandomShip();
        }
      } else if (computerAxis === "vertical") {
        let randomNumber = Math.floor(Math.random() * 2);
        let randomNeighbor;
        randomNumber === 1
          ? (randomNeighbor = Number(neighbors.neighborDown))
          : (randomNeighbor = Number(neighbors.neighborUp));

        if (
          (lastShipMiss && tilesHitOnComputerTurn === 0) ||
          (tilesHitOnComputerTurn > 1 &&
            verticalComputerNeighborsMissed === 2) ||
          tilesHitOnComputerTurn === 5 ||
          lastShipWasSunk
        ) {
          shootRandomShip();
        } else if (
          !playerGrid[Number(neighbors.neighborDown)].isShot &&
          !playerGrid[Number(neighbors.neighborDown)].isMissed &&
          !playerGrid[Number(neighbors.neighborUp)].isShot &&
          !playerGrid[Number(neighbors.neighborUp)].isMissed
        ) {
          shootTile(playerGrid[randomNeighbor]);
        } else if (
          !playerGrid[Number(neighbors.neighborDown)].isShot &&
          !playerGrid[Number(neighbors.neighborDown)].isMissed &&
          (playerGrid[Number(neighbors.neighborUp)].isShot ||
            playerGrid[Number(neighbors.neighborUp)].isMissed)
        ) {
          shootTile(playerGrid[Number(neighbors.neighborDown)]);
        } else if (
          !playerGrid[Number(neighbors.neighborUp)].isShot &&
          !playerGrid[Number(neighbors.neighborUp)].isMissed &&
          (playerGrid[Number(neighbors.neighborDown)].isShot ||
            playerGrid[Number(neighbors.neighborDown)].isMissed)
        ) {
          shootTile(playerGrid[Number(neighbors.neighborUp)]);
          console.log(neighbors);
        } else {
          shootRandomShip();
        }
      }
    };
    const neighborsOriginal = getNeighborTiles(originalTile);
    const neighborsLastHit = getNeighborTiles(lastHitTile);
    console.log(neighborsOriginal);
    if (winner !== "none") {
      return;
    }
    if (
      currentPlayer === "computer" &&
      playerGrid &&
      computerGrid &&
      !computerShotReset &&
      !computerShotSent &&
      lastTile !== originalTile &&
      lastShipMiss &&
      tilesHitOnComputerTurn > 1 &&
      ((computerAxis === "horizontal" &&
        (playerGrid[Number(neighborsOriginal.neighborLeft)].isShot ||
          playerGrid[Number(neighborsOriginal.neighborLeft)].isMissed) &&
        (playerGrid[Number(neighborsOriginal.neighborRight)].isShot ||
          playerGrid[Number(neighborsOriginal.neighborRight)].isMissed)) ||
        (computerAxis === "vertical" &&
          (playerGrid[Number(neighborsOriginal.neighborDown)].isShot ||
            playerGrid[Number(neighborsOriginal.neighborDown)].isMissed) &&
          (playerGrid[Number(neighborsOriginal.neighborUp)].isShot ||
            playerGrid[Number(neighborsOriginal.neighborUp)].isMissed)))
    ) {
      nextShot();
    } else if (
      currentPlayer === "computer" &&
      playerGrid &&
      computerGrid &&
      !computerShotReset &&
      !computerShotSent &&
      !updatedComputerAxis &&
      tilesHitOnComputerTurn === 1 &&
      ((computerAxis === "horizontal" &&
        (playerGrid[Number(neighborsOriginal.neighborLeft)].isShot ||
          playerGrid[Number(neighborsOriginal.neighborLeft)].isMissed) &&
        (playerGrid[Number(neighborsOriginal.neighborRight)].isShot ||
          playerGrid[Number(neighborsOriginal.neighborRight)].isMissed)) ||
        (computerAxis === "vertical" &&
          (playerGrid[Number(neighborsOriginal.neighborDown)].isShot ||
            playerGrid[Number(neighborsOriginal.neighborDown)].isMissed) &&
          (playerGrid[Number(neighborsOriginal.neighborUp)].isShot ||
            playerGrid[Number(neighborsOriginal.neighborUp)].isMissed)))
    ) {
      setLastTile(originalTile);
      setUpdatedLastTile(true);
      toggleComputerShotAxis();
      setUpdatedComputerAxis(true);
    } else if (
      (currentPlayer === "computer" &&
        playerGrid &&
        computerGrid &&
        !computerShotReset &&
        !computerShotSent &&
        lastTile !== originalTile &&
        tilesHitOnComputerTurn > 0 &&
        lastShipMiss) ||
      (lastTile !== originalTile &&
        ((tilesHitOnComputerTurn > 1 &&
          tileIsOnTheRightEdge(lastTile) &&
          computerAxis === "horizontal") ||
          (tilesHitOnComputerTurn > 1 &&
            tileIsOnTheLeftEdge(lastTile) &&
            computerAxis === "horizontal") ||
          (tilesHitOnComputerTurn > 1 &&
            tileIsOnTheBottomEdge(lastTile) &&
            computerAxis === "vertical") ||
          (tilesHitOnComputerTurn > 1 &&
            tileIsOnTheTopEdge(lastTile) &&
            computerAxis === "vertical"))) ||
      (tilesHitOnComputerTurn > 1 &&
        lastTile !== originalTile &&
        ((computerAxis === "horizontal" &&
          (playerGrid[Number(neighborsLastHit.neighborLeft)].isMissed ||
            playerGrid[Number(neighborsLastHit.neighborRight)].isMissed)) ||
          (computerAxis === "vertical" &&
            (playerGrid[Number(neighborsLastHit.neighborDown)].isMissed ||
              playerGrid[Number(neighborsLastHit.neighborUp)].isMissed))))
    ) {
      setLastTile(originalTile);
      setUpdatedLastTile(true);
    } else if (
      currentPlayer === "computer" &&
      playerGrid &&
      computerGrid &&
      !computerShotReset &&
      !computerShotSent &&
      lastTile === originalTile
    ) {
      nextShot();
    } else if (
      currentPlayer === "computer" &&
      playerGrid &&
      computerGrid &&
      computerShotReset &&
      !computerShotSent
    ) {
      shootRandomShip();
      setComputerShotReset(false);
    } else if (
      currentPlayer === "computer" &&
      playerGrid &&
      computerGrid &&
      !computerShotReset &&
      !computerShotSent &&
      lastTile
    ) {
      nextShot();
    }
  }, [
    originalTile,
    updatedLastTile,
    tilesHitOnComputerTurn,
    computerNeighborsMissed,
    originalTile,
    currentPlayer,
    computerAxis,
    updatedComputerAxis,
    lastTile,
    lastShipHit,
    lastShipMiss,
    computerShotSent,
    playerGrid,
    destroyerTilesHit,
    computerGrid,
    winner,
    lastShipWasSunk,
    horizontalComputerNeighborsMissed,
    verticalComputerNeighborsMissed,
    computerShotReset,
    computerTilesToPickFromArray,
    submarineTilesHit,
    cruiserTilesHit,
    battleshipTilesHit,
    carrierTilesHit,
  ]);

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
      neighbor1 = Number(position.id) + x;
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
      neighbor1 = Number(position.id + x);
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
      neighbor1 = Number(position.id) + x;
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
      neighbor1 = Number(position.id) + x;
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
      neighbor1 = Number(position.id) + x;
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
      isLastTile={lastTile}
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
        onClick={
          playerShotSent
            ? null
            : () => (winner === "none" ? shootTile(tile) : null)
        }
      />
    ));

  const playerHitPopUpElements = (
    <HitPopUp
      key={nanoid()}
      currentPlayer={currentPlayer}
      hitOrMiss={hitOrMiss}
      destroyerTilesHit={destroyerTilesHit}
      submarineTilesHit={submarineTilesHit}
      cruiserTilesHit={cruiserTilesHit}
      battleshipTilesHit={battleshipTilesHit}
      carrierTilesHit={carrierTilesHit}
      lastShipSunk={lastShipSunk}
      winner={winner}
      onClick={() => {
        currentPlayer === "player"
          ? setPlayerShotSent(false)
          : setComputerShotSent(false);
        setShowHitPopUp(false);
        setLastShotSunk(false);
        setLastShipSunk("none");
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
        <div className="bslogo">BATTLESHIP</div>
        {!allShipsPlaced && (
          <div className="box">
            {!allShipsPlaced && (
              <div className="ship-placement">PLEASE PLACE YOUR</div>
            )}
            {!allShipsPlaced && (
              <div className="ship-placement current">{currentShip}</div>
            )}
            {!allShipsPlaced && (
              <button onClick={() => switchAxis()} className="axisbutton">
                Switch Axis
              </button>
            )}
          </div>
        )}
        {startGame && (
          <div className="target-box">
            {showHitPopUp
              ? playerHitPopUpElements
              : startGame &&
                currentPlayer === "player" && (
                  <div className="choosetile">
                    PLEASE SELECT A TARGET TO SHOOT
                  </div>
                )}{" "}
          </div>
        )}
        {!startGame && allShipsPlaced && (
          <button
            className="startgame"
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
