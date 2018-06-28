/**
 * This file is designed to provide a way for reseting/reshaping our database into a development/test ready state by:
 *    1. drop all existed collections defined in `entityArray`
 *    2. read mock data from file '../../data/mock/store/index.js'
 *    3. store the mock data back to the database
 */
const _ = require('lodash');

const mockData = require('./mockData');
const DbOperations = require('./index');
const applyModifiers  = (obj) => {
    obj = JSON.stringify(obj).replace(/{{(now|(r)\((\d+)\))}}/g, (input, match, $1_modifier, $2_quantity) => {
        if (match === 'now') return new Date().getTime();
        else if ($1_modifier === 'r') return Math.floor((Math.random() * $2_quantity) + 1);

        return input;
    });
    return JSON.parse(obj);
};
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

function applyTemplatesWithModifiers (dataList, template) {
  const newList = dataList.map((item) => {
    const item1 = applyModifiers(item);
    const item2 = _.assign({}, template, item1);
    return item2;
  });
  return newList;
}

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
    if (dataGroup.template) {
      fakeData = applyTemplatesWithModifiers(fakeData, dataGroup.template);
    }

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
