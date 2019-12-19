'use strict';
const {
    dialogflow,
    Permission,
    BasicCard,
    Image,
    List,
    Suggestions,
    Table
} = require('actions-on-google');
const functions = require('firebase-functions');
const ggenie = require('./gamegenie_assets/ggenie');
const app = dialogflow({debug: true});

app.intent('Default Welcome Intent', (conv) => {
    conv.ask("Hello, this is the Game Genie. I can help you " +
    "keep track of what games you want to play. I am in my early phase so " +
    "my game database is small at the moment.");
    conv.ask("What do you want to do?");
    conv.ask(new Suggestions(["Search for games", "View my list", "Give me a random game"]));
}); 

app.intent('Game Search (by name)', (conv, {Custom_Entities}) => {
    console.log("Inputed game was: ", Custom_Entities);
    
    let obtainedGames = [];
    ggenie.searchGameByName(Custom_Entities, (game) => {
        obtainedGames = game;
    });
    if(obtainedGames === null || obtainedGames === ''){
        conv.ask(Custom_Entities + " might not be in my database yet. Try another game.");
    }else{
        if(obtainedGames.length === 1){
            conv.data.gameToSave = obtainedGames[0];
            console.log("Saved to data.gameToSave", conv.data.gameToSave);
            conv.ask(obtainedGames[0].title + " by " + obtainedGames[0].developer + ". Add to list?");
            conv.ask(new BasicCard({
                text: obtainedGames[0].description,
                subtitle: obtainedGames[0].developer,
                title: obtainedGames[0].title,
                image: new Image({
                    url: obtainedGames[0].img,
                    alt: obtainedGames[0].title
                })
            }));
            conv.ask(new Suggestions(
                ["Add this to my list!", "Find another game."]
            ));

        }else{
            conv.ask("I found multiple games. Pick one from the results.");
            let thisListItems = {};
            console.log("Obtained Games: ", obtainedGames);
            obtainedGames.forEach(element => {
                thisListItems[element.gameId] = {
                    title: element.title,
                    description: element.description,
                    image: new Image({
                        url: element.img,
                        alt: element.title
                    })
                };
            });

            console.log("Multiple Games Object: ", thisListItems);

            conv.ask(new List({
                title: 'Result: ',
                items: thisListItems
            }));
            
        }
    }
});

app.intent('Multiple Game Searched Option', (conv, params, option) => {
    if(!option){
        conv.ask("You didn't answer with an acceptable answer...");
    }else{
        ggenie.searchGameByGameId(Number(option), returnedGame => {
            conv.ask("Do you want to add " + returnedGame.title + " to your list?");
            conv.ask(new BasicCard({
                text: returnedGame.description,
                subtitle: returnedGame.developer,
                title: returnedGame.title,
                image: new Image({
                    url: returnedGame.img,
                    alt: returnedGame.title
                })
            }));
            conv.data.gameToSave = returnedGame;
        });
        conv.ask(new Suggestions(["Add this to my List!", "Search for another game."]));
    }
});

app.intent('Game Randomizer', (conv) => {
    conv.ask("One random game, coming right up!");
    randomGamerizer(conv);
});

app.intent('Add Game To List', (conv, {Custom_Entities}) => {
    if(Custom_Entities){
        console.log("[index] Explicitly adding to game list: ", Custom_Entities);
        conv.data.gameToSave = "";

        ggenie.searchGameByName(Custom_Entities, result => {
            if(result.length === 1){
                ggenie.addToList(result[0].gameId, result => {
                    console.log("[index] Adding to game list result: ", result);
                    if(result[0] === "Success"){
                        conv.ask(Custom_Entities + " has been added to the list. "+
                        "It's currently in position "+ result[1] + ".");
                    }
                    if(result[0] === "Duplicate"){
                        conv.ask(Custom_Entities + " is already in your list. It is currently at position " + result[1] + " in the queue.");
                    }
                });
            }
            else if(result.length > 1){
                conv.ask("Unhandled multiple game choices");
            }
            else{
                conv.ask(Custom_Entities + " might not be in my database yet. Try looking for another game.");
            }
            
        });
    }

    if(conv.data.gameToSave){
        console.log("Adding to game list: ", conv.data.gameToSave);
        ggenie.addToList(conv.data.gameToSave.gameId, result => {
            console.log("[index] Adding to game list result: ", result);
            
            if(result[0] === "Success"){
                conv.ask(conv.data.gameToSave.title + " has been added to the list. "+
                "It's currently in position "+ result[1]);
            }
            if(result[0] === "Duplicate"){
                conv.ask(conv.data.gameToSave.title + " is already in your list. It is currently at position " + result[1] + " in the queue.");
            }
            if(result === "Not found"){
                conv.ask("The game was not found on my database");
            }
        });
    }

    conv.ask("Do you want to see your playlist or search for another game?");
    conv.ask(new Suggestions(["View my list", "Search for another game."]));
});

app.intent('Game Randomizer - Another', (conv) => {
    conv.ask("Here's another one.");
    randomGamerizer(conv);
}); 

app.intent('Game List View', (conv) => {
    let rawGameList = {};
    let gameList = {};

    ggenie.retrieveGameList(result => {
        console.log("Returned game list: ", result);
        rawGameList = result;

        result.forEach(game => {
            gameList[Object.keys(gameList).length + 1] = {
                synonyms: [game.gameId, game.title],
                title: game.title,
                description: game.description,
                image: new Image({
                    url: game.img,
                    alt: game.title
                })
            }
        });
    });
    
    console.log("Array Construction: ", gameList);

    if(Object.keys(gameList).length > 1){
        conv.ask("Here is your list.");
        conv.ask(new List({
        title: 'Your game playlist in order of added date',
        items: gameList
    }));
    }
    else if(Object.keys(gameList).length === 1){
        conv.ask("There is currently one game on your list and it's " + rawGameList[0].title + "!");
        conv.ask(new BasicCard({
            title: rawGameList[0].title,
            subtitle: rawGameList[0].developer,
            text: rawGameList[0].description,
            image: new Image({
                url: rawGameList[0].img,
                alt: rawGameList[0].title,
            }),
        }));
    }
    else{
        conv.ask("Your list is currently empty! Add some games to the list!");
    }
}); 

app.intent('Clear List', (conv) => {
    ggenie.clearGameList(result => {
        if(result === "Success"){
            conv.ask("Your playlist has been cleared.");
        }
    })
});

app.catch((conv, err) => {
    console.error("You have reached the error catcher handler! Here's the error: ", err);
    conv.ask("wtf: " + err);
});

app.intent('Recommendation', (conv) => {
    console.log("You have reached the recommendation intent");
    conv.ask("Alright, what game genre do you usually play? Type or say your answer.");
    var suggestionChips = [];

    ggenie.retrieveAllGenreObject(result => {
        result.forEach(item => {
            var arrayWrap = [];
            arrayWrap.push(item.name);
            arrayWrap.push(item.alt);
            suggestionChips.push(arrayWrap);
        });
    });

    console.log(JSON.stringify(suggestionChips, null, 4));

    conv.ask(new Table({
        title: "Available genres",
        columns: ["Names", "Shortcuts"],
        rows: suggestionChips,
    }));
    // conv.ask(new Suggestions(suggestionChips));
});

app.intent('Recommendation - Genre', (conv, {genre_entities}) => {
   console.log("Input genre: ", genre_entities);
    
    ggenie.retrieveGenreObject(genre_entities[0], result => {
        console.log("Result object: ", JSON.stringify(result, null, 2));
        conv.data.reccommendGenreObject = result;
    });

    conv.ask("Okay, do you have any developers in mind?");
    conv.ask("If you have none, respond with 'none'.");
});

app.intent('Recommendation - Developer', (conv, {developer_entities}) => {
    
    
    conv.ask("Here ")
});

function randomGamerizer(conv){
    ggenie.giveRandomGame(randomGame => {
        conv.ask("It's " + randomGame.title + " by " + randomGame.developer + "!");
            conv.ask(new BasicCard({
                text: randomGame.description,
                subtitle: randomGame.developer,
                title: randomGame.title,
                image: new Image({
                    url: randomGame.img,
                    alt: randomGame.title
                })
            }));
            conv.ask(new Suggestions(
                ["Add this to my list!", "Give me another one."]
            ))
            conv.data.gameToSave = randomGame;
    });
}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);