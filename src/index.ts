(function(){
    const tiles = [] as Tile[][];
    let things = ["car", "bumblebee", "laptop", "phone", "puppet", "fidget spinner", "floss", "pencil", "mug", "cat", "song", "cookie", "chair", "eye", "pillow", "counter", "nail", "window"];
    const boardSize = 4

    interface Tile {
        x: number,
        y: number,
        thing: string,
        faceup: boolean
    }
    const generateGameBoard = (boardSize: number, tilesArray: Tile[][]) => {
        for(let row = 0; row < boardSize; row++) {
            let rows = [] as Tile[];
            for (let col = 0; col < boardSize; col++) {
                  let column = { "x": row, "y": col } as Tile;
              rows.push(column);
            }
            tilesArray.push(rows);
        }
        return tilesArray;
    },
    getRandomIndex = (value: number) => Math.floor(Math.random()*value),
    pickAThing = (): string => {
        let thingIndex = getRandomIndex(things.length),
            selectedThing = things[thingIndex];
            things.splice(thingIndex, 1);
        return selectedThing;
    },
    pickACoordinate = () => { return { "x": getRandomIndex(boardSize), "y": getRandomIndex(boardSize) } },
    pickAndPlaceThing = () => {
        let randomThing = pickAThing(),
            tileOne = pickACoordinate(),
            firstTile = tiles[tileOne.x][tileOne.y],
            firstItem = firstTile.thing;
            for (let i = 0; i < 10000; i++) {
                if (!firstTile.thing) {
                    firstTile.thing = randomThing;
                    break;
                } else {
                    tileOne = pickACoordinate();
                    firstTile = tiles[tileOne.x][tileOne.y]
                    firstTile.thing = firstItem;
                }
            }
            // firstTile.thing = firstTile.thing;
        
        let tileTwo = pickACoordinate(),
            secondTile = tiles[tileTwo.x][tileTwo.y],
            secondItem = secondTile.thing;
            for (let i = 0; i < 10000; i++) {
                if (!secondTile.thing) {
                    secondTile.thing = randomThing;
                    break;
                } else {
                    tileTwo = pickACoordinate();
                    secondTile = tiles[tileTwo.x][tileTwo.y];
                    secondTile.thing = secondItem
                }
            }
            // secondTile.thing = secondTile.thing;
    },    
    setBoard = () => {
        for (let i = 0; i < (boardSize*boardSize)/2; i++) {
          pickAndPlaceThing();
      }
    },
    turnTiles = (tile1X:number,tile1Y:number,tile2X:number,tile2Y:number): Object => {
        let tile1 = tiles[tile1X][tile1Y],
            tile2 = tiles[tile2X][tile2Y];

        if (tile1.thing === tile2.thing) {
            tile1.faceup = true
            tile2.faceup = true
        }
        return { tile1, tile2 }
    },
    serializeBoard = () => {
        let matchedTilesArray = []
      
        for(let row = 0; row < boardSize; row++) {
            let rows = []
          for (let col = 0; col < boardSize; col++) {
              let column = tiles[row][col]
              if(column.faceup){
                rows.push(column);
              }else{
                rows.push("");
              }
          }
        matchedTilesArray.push(rows);
        }
        return matchedTilesArray;
    },
    playGame = () => {
        generateGameBoard(boardSize, tiles);
        setBoard();
    },
    checkTiles = () => {
        for(let i = 0; i < boardSize; i++) {
          for(let j = 0; j < boardSize; j++) {
            let tile = tiles[i][j]
          if(!tile.faceup){
            return false;
          } 
        }
      }
      return true;
    };

    playGame();
    
    document.addEventListener("DOMContentLoaded", () =>{
        const input = document.querySelector("#ask") as Element;
        input.addEventListener('click', (): void => {
            let response = prompt("Please enter two X and Y coordinates, separated by a comma.");
            if (response) {
              let coordinates = response.split(",");
              let [xCoordinate1, yCoordinate1, xCoordinate2, yCoordinate2] = coordinates;
              let pickedTiles = turnTiles(Number(xCoordinate1), Number(yCoordinate1), Number(xCoordinate2), Number(yCoordinate2));
              console.log(pickedTiles);
              console.log(serializeBoard());
              if(checkTiles()) {
                  console.log("Finished!");
              }
            }
        })
    })

})()