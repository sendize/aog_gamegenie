'use strict';

const gameLib = require('./gamelibrary');
const gameList = require('./gamelist');
const steamAPI = require('./steamAPI');
const games = gameLib.games;

function searchGameByGameId(id, cb){
    console.log("[ggenie] Searching for game with ID ", id);
    cb(games.find(element => element.gameId === id));
    return; 
}

function searchGameByName(input, cb){
    let gamesFound = [];
    games.forEach(item => {
        if(item.title === input){
            gamesFound.push(item);
            return; 
        }
        item.alt.forEach(subitem => {
            if(subitem === input){
                gamesFound.forEach(alreadyAdded => {
                    if(alreadyAdded.title === item.title){
                        return;
                    }else{
                        gamesFound.push(item);
                    }
                });
            }
        });
    });
    cb(gamesFound);
}

function giveRandomGame(cb){
    cb(games[Math.floor(Math.random() * games.length)]);
}

function addToList(idOfGameToPut, cb){

    searchGameByGameId(Number(idOfGameToPut), foundGame => {
        console.log("[ggenie] Found game: ", foundGame);

        gameList.addToGameList(foundGame, result => {
            if(result[0] === "Success"){
                cb(["Success", result[1]]);
                return;
            }
            if(result[0] === "Duplicate"){
                cb(["Duplicate", result[1]]);
                return;
            }

            if(result === null || result === undefined){
                cb("Not found");
                return;
            }
        });
    });
}

function retrieveGameList(cb){
    let gamesPlaylist = [];

    gameList.retrieveGameList(list =>{
        gamesPlaylist = list;
    });

    cb(gamesPlaylist);
}

function clearGameList(cb){
    gameList.clearList(result =>{
        if(result === "Success"){
            cb("Success");
            return;
        }
    });
}

function retrieveAllGenreObject(cb){
    cb(gameLib.genre);
}

function retrieveGenreObject(input, cb){
    var foundGenreObject = gameLib.genre.find((element) => {
        return element.name === input || element.alt === input;
    });

    cb(foundGenreObject);
}

function returnMyProfile(){
    steamAPI.exampleFunction();
}

module.exports ={
    searchGameByName: searchGameByName,
    giveRandomGame: giveRandomGame,
    addToList: addToList,
    searchGameByGameId: searchGameByGameId,
    retrieveGameList: retrieveGameList,
    clearGameList: clearGameList,
    returnMyProfile: returnMyProfile,
    retrieveGenreObject: retrieveGenreObject,
    retrieveAllGenreObject: retrieveAllGenreObject
}