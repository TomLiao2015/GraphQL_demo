// const _ = require('lodash');

const mockData = require('./mockData');
const DbOperations = require('./index');
const entityArray = [
  'customers',
  'transactions'
];

dropCollections().then((res) => {
  initCollections(entityArray.length - 1);
}).catch((err) => {
  console.error(err);
  process.exit(13);
});


function initCollections () {
  let collections = [...entityArray];

  const work = () => {
    if (collections.length === 0) {
      return;
    }

    const [entityName, ...rest] = collections;
    collections = rest;

    const dataGroup = mockData.data[entityName];
    let fakeData = dataGroup.list;

    if (entityName && fakeData.length > 0) {
      DbOperations.insertDocuments(entityName, fakeData).then(() => {
        console.log('ReshapeDb: insert collection: ', entityName, 'data length :', fakeData.length);

        process.nextTick(() => {
          setTimeout(work, 500);
        });
      }).catch((error) => {
        console.error('Error: ', error);
        process.exit(13);
      });
    } else {
      console.log('ReshapeDb: insert collection: ', entityName, 'no data to insert!');
      process.nextTick(() => {
        setTimeout(work, 500);
      });
    }
  };

  work();
}

module.exports.initCollections = initCollections;

function dropCollections () {
  return new Promise((resolve, reject) => {
    let actionArrays = entityArray.map((entity) => {
      console.log('ReshapeDb: Drop Collections', entity);
      return DbOperations.dropCollection(entity).catch((err) => {
        if (err.message !== 'ns not found') {
          reject(new Error(err));
        }
      });
    });
    Promise.all(actionArrays).then(() => {
      resolve();
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports.dropCollections = dropCollections;
