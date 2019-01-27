"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
(function () {
    var tiles = [];
    var things = ["car", "bumblebee", "laptop", "phone", "puppet", "fidget spinner", "floss", "pencil", "mug", "cat", "song", "cookie", "chair", "eye", "pillow", "counter", "nail", "window"];
    var boardSize = 4;
    var generateGameBoard = function (boardSize, tilesArray) {
        for (var row = 0; row < boardSize; row++) {
            var rows = [];
            for (var col = 0; col < boardSize; col++) {
                var column = { "x": row, "y": col };
                rows.push(column);
            }
            tilesArray.push(rows);
        }
        return tilesArray;
    }, getRandomIndex = function (value) { return Math.floor(Math.random() * value); }, pickAThing = function () {
        var thingIndex = getRandomIndex(things.length), selectedThing = things[thingIndex];
        things.splice(thingIndex, 1);
        return selectedThing;
    }, pickACoordinate = function () { return { "x": getRandomIndex(boardSize), "y": getRandomIndex(boardSize) }; }, pickAndPlaceThing = function () {
        var randomThing = pickAThing(), tileOne = pickACoordinate(), firstTile = tiles[tileOne.x][tileOne.y], firstItem = firstTile.thing;
        for (var i = 0; i < 10000; i++) {
            if (!firstTile.thing) {
                firstTile.thing = randomThing;
                break;
            }
            else {
                tileOne = pickACoordinate();
                firstTile = tiles[tileOne.x][tileOne.y];
                firstTile.thing = firstItem;
            }
        }
        var tileTwo = pickACoordinate(), secondTile = tiles[tileTwo.x][tileTwo.y], secondItem = secondTile.thing;
        for (var i = 0; i < 10000; i++) {
            if (!secondTile.thing) {
                secondTile.thing = randomThing;
                break;
            }
            else {
                tileTwo = pickACoordinate();
                secondTile = tiles[tileTwo.x][tileTwo.y];
                secondTile.thing = secondItem;
            }
        }
    }, setBoard = function () {
        for (var i = 0; i < (boardSize * boardSize) / 2; i++) {
            pickAndPlaceThing();
        }
    }, turnTiles = function (tile1X, tile1Y, tile2X, tile2Y) {
        var tile1 = tiles[tile1X][tile1Y], tile2 = tiles[tile2X][tile2Y];
        if (tile1.thing === tile2.thing) {
            tile1.faceup = true;
            tile2.faceup = true;
        }
        return { tile1: tile1, tile2: tile2 };
    }, serializeBoard = function () {
        var matchedTilesArray = [];
        for (var row = 0; row < boardSize; row++) {
            var rows = [];
            for (var col = 0; col < boardSize; col++) {
                var column = tiles[row][col];
                if (column.faceup) {
                    rows.push(column);
                }
                else {
                    rows.push("");
                }
            }
            matchedTilesArray.push(rows);
        }
        return matchedTilesArray;
    }, playGame = function () {
        generateGameBoard(boardSize, tiles);
        setBoard();
    }, checkTiles = function () {
        for (var i = 0; i < boardSize; i++) {
            for (var j = 0; j < boardSize; j++) {
                var tile = tiles[i][j];
                if (!tile.faceup) {
                    return false;
                }
            }
        }
        return true;
    };
    playGame();
    document.addEventListener("DOMContentLoaded", function () {
        var input = document.querySelector("#ask");
        input.addEventListener('click', function () {
            var response = prompt("Please enter two X and Y coordinates, separated by a comma.");
            if (response) {
                var coordinates = response.split(",");
                var _a = __read(coordinates, 4), xCoordinate1 = _a[0], yCoordinate1 = _a[1], xCoordinate2 = _a[2], yCoordinate2 = _a[3];
                var pickedTiles = turnTiles(Number(xCoordinate1), Number(yCoordinate1), Number(xCoordinate2), Number(yCoordinate2));
                console.log(pickedTiles);
                console.log(serializeBoard());
                if (checkTiles()) {
                    console.log("Finished!");
                }
            }
        });
    });
})();
//# sourceMappingURL=index.js.map