'use strict';

const dialogflow = require('dialogflow');
const gamesDB = require('../functions/gamegenie_assets/gamelibrary.js');
const credentials = require('./secrets/ihl-gamegenie-aog-c8ddd8a76c63.json');

const entitiesClient = new dialogflow.EntityTypesClient({
 credentials: credentials,
});

const projectId = 'ihl-gamegenie-aog';
const agentPath = entitiesClient.projectAgentPath(projectId);

class EntityNotFoundError extends Error {}

entitiesClient
  .listEntityTypes({parent: agentPath})
  .then((responses) => {
    const resources = responses[0];
    var foundEntity = resources.find(element => element.displayName === 'developer_entities');
    if(foundEntity){
      return foundEntity;
    }else{
      throw new EntityNotFoundError();
    }
  })
  .then((developers) => {
    let developerLibrary = gamesDB.developers;
    const updatedEntityList = [];
    developerLibrary.forEach(developerItem => {
      developerItem.alt.unshift(developerItem.name);
      updatedEntityList.push({
        value: developerItem.name,
        synonyms: developerItem.alt
      });
    });

    developers.entities = updatedEntityList;

    const request = {
      entityType: developers,
      updateMask: {
        paths: ['entities'],
      }
    };
    return entitiesClient.updateEntityType(request);
  })
  .then((responses) => {
    console.log('Updated entity type:', JSON.stringify(responses[0], null, 2));
    return;
  })
  .catch((err) => {
    if( err instanceof EntityNotFoundError){
      console.error('Could not find the entity named developer_entities');
      return;
    }
    console.error('Error updating entity type: ', err);
  })

//Update Genres

entitiesClient
  .listEntityTypes({parent: agentPath})
  .then((responses) => {
    const resources = responses[0];

    var foundEntity = resources.find(element => element.displayName === 'genre_entities');
    if(foundEntity){
      return foundEntity;
    }else{
      throw new EntityNotFoundError();
    }

  })
  .then((genres) => {
    let genreLibrary = gamesDB.genre;
    const updatedEntityList = [];

    genreLibrary.forEach(genreItem => {
      genreItem.alt.unshift(genreItem.name);
      updatedEntityList.push({
        value: genreItem.name,
        synonyms: genreItem.alt
      });
    });

    genres.entities = updatedEntityList;

    const request = {
      entityType: genres,
      updateMask: {
        paths: ['entities'],
      }
    };
    return entitiesClient.updateEntityType(request);
  })
  .then((responses) => {
    console.log('Updated entity type:', JSON.stringify(responses[0], null, 2));
    return;
  })
  .catch((err) => {
    if( err instanceof EntityNotFoundError){
      console.error('Could not find the entity named genre_entities');
      return;
    }
    console.error('Error updating entity type:', err);
  })



//Update Games

// entitiesClient
//    .listEntityTypes({parent: agentPath})
//    .then((responses) => {
//      const resources = responses[0];
//      for (let i = 0; i < resources.length; i++) {
//        const entity = resources[i];
//        if (entity.displayName === 'Custom_Entities') {
//          return entity;
//        }
//      }
//      throw new EntityNotFoundError();
//    })
//    .then((games) => {
//     console.log('Found games: ', JSON.stringify(games));
//     let gameLibrary = gamesDB.games;
//     const updatedEntityList = [];    

//     gameLibrary.forEach(item => {
//       item.alt.unshift(item.title);
//         updatedEntityList.push({
//             value: item.title,
//             synonyms: item.alt
//         })
//     });

//     games.entities = updatedEntityList;

//     const request = {
//       entityType: games,
//       updateMask: {
//         paths: ['entities'],
//       },
//     };
//     return entitiesClient.updateEntityType(request);
//   })
//   .then((responses) => {
//     console.log('Updated entity type:', JSON.stringify(responses[0]));
//     return;
//   })
//   .catch((err) => {
//       if (err instanceof EntityNotFoundError) {
//         console.error('Could not find the entity named games.');
//         return;
//       }
//       console.error('Error updating entity type:', err);
//   });