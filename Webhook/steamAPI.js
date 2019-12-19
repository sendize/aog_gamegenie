"use strict";

//doesnt work due to free tier

var SteamAPI = require('steamapi');
const steam = new SteamAPI('D02FB6D3CC2385867A0C9F90AC9B568');

function exampleFunction(){
    console.log("[SteamAPI] I have been called!", JSON.stringify(steam, null, 4));
    let mySteamID = null;
    let myProfileSummary = null;

    steam.resolve('https://steamcommunity.com/id/AirRaze').then(id => {
        console.log("Displaying ID");
        console.log(JSON.stringify(id, null, 4));
        console.log("[SteamAPI] Your Steam ID is: " + id);
        mySteamID = id;
        return;
    }, (reason => {
        console.log(JSON.stringify(reason, null, 4));
    }))
    .catch((err) => {
        console.log(JSON.stringify(err, null, 4));
    });

    // steam.getUserSummary(mySteamID).then(summary =>{
    //     myProfileSummary = summary;
    //     return;
    // }).catch((err) => {
    //     console.log("[SteamAPI]: ", err);
    // });

    // console.log("SteamAPI Profile Summary: ", myProfileSummary);
}

function getProfileSummaryByID(id, cb){
    steam.getUserSummary(id).then(summary => {
        cb(summary);
        return;
    })
    .catch((err) => {
        console.log("[SteamAPI]: ", err);
    });
}


module.exports = {
    exampleFunction: exampleFunction
};