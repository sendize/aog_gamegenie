'use strict';

const dialogflow = require('dialogflow');

// Read in credentials from file. To get it, follow instructions here, but
// choose 'API Admin' instead of 'API Client':
// https://dialogflow.com/docs/reference/v2-auth-setup
const credentials = require('./secrets/ihl-gamegenie-aog-c8ddd8a76c63.json');

const entitiesClient = new dialogflow.EntityTypesClient({
 credentials: credentials,
});

const projectId = 'ihl-gamegenie-aog';
const agentPath = entitiesClient.projectAgentPath(projectId);

const gamesEntity = {
    displayName: 'Games_Updated',
    kind: 'KIND_MAP',
    entities:[
        {value: 'Sample1', synonyms: ['s1']},
        {value: 'Sample2', synonyms: ['s2']}
    ]
};

const gamesEntityRequest = {
    parent: agentPath,
    entityType: gamesEntity
};

const genreEntity = {
    displayName: 'Genre_Updated',
    kind: 'KIND_MAP',
    entities: [
        
    ]
}

entitiesClient
    .createEntityType(gamesEntityRequest)
    .then((responses) => {
        console.log("Created new entity type: " + JSON.stringify(responses[0]));
        return;
    }) 
    .catch((err) => {
        console.error("Error creating entity type: " + err);
    });