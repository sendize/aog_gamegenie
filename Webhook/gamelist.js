'use strict';

var gamesList = [];

function addToGameList(game, cb){
    const duplicateId = (element) => element.gameId === game.gameId;
    const isThereDuplicate = gamesList.some(duplicateId);

    if(isThereDuplicate){
        var positionInQueue = gamesList.findIndex(element => element.gameId === game.gameId);
        console.log("[gamelist] Returning with code DUPLICATE with position ", positionInQueue);
        cb(["Duplicate", (positionInQueue + 1)]);
        return;
    }else{
        gamesList.push(game);
        console.log("[gamelist] Returning with code SUCCESS with length ", gamesList.length);
        cb(["Success", gamesList.length]);
        return;
    }
}

function retrieveGameList(cb){
    cb(gamesList);
}

function clearList(cb){
    gamesList.length = 0;
    cb("Success");
    return;
}

module.exports = {
    gamesList: gamesList,
    addToGameList: addToGameList,
    retrieveGameList: retrieveGameList,
    clearList: clearList
}