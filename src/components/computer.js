function placeComputerSubmarine(shipType) {
  let randomAxis;
  let tile;
  let position;
  let x;
  const loadVars = new Promise((res) => {
    randomAxis = getRandomAxis();
    tile = getRandomTile();
    position = computerGrid[tile];
    res();
  });
  loadVars
    .then(() => {
      if (randomAxis === "horizontal") {
        x = 1;
      } else {
        x = 10;
      }
    })
    .then(() => {
      console.log(x);
      if (!position.isShipPlaced) {
        if (
          ((position.key + 1) % 10 === 0 && randomAxis === "horizontal") ||
          ((position.key + 1) % 10 === 9 && randomAxis === "horizontal") ||
          (position.key + 1 > 80 && randomAxis === "vertical")
        ) {
          console.log("invalid choice");
          placeComputerSubmarine("submarine");
        } else {
          let neighbor1;
          let neighbor2;
          const loadNeighborVars = new Promise((res) => {
            neighbor1 = position.key + x;
            neighbor2 = neighbor1 + x;
            res();
          });
        }
      }
        }).then(() => {
            if (
              computerGrid[neighbor1].isShipPlaced ||
              computerGrid[neighbor2].isShipPlaced
            ) {
              console.log("overlap");
              placeComputerSubmarine("submarine");
            } else {
              setComputerCurrentShip("cruiser");
              console.log("submarine placed");
              const setGrid = new Promise((res) => {
                setComputerGrid((oldGrid) =>
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
                res();
              });
              console.log("sub placed");
              setGrid.then(placeComputerCruiser("cruiser"));
            }
          });
        }
      } else {
        placeComputerSubmarine("submarine");
      };
}