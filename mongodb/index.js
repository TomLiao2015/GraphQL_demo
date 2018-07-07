const { MongoClient, ObjectId, Binary } = require('mongodb');

// const dbAddress = 'mongodb://tom:1q2w3e4r@ds227821.mlab.com:27821/tomdemo';

const dbAddress = process.env.DB || 'mongodb://localhost/demo';
const MISSING_FILTER = new Error('Missing query filter argument');
const MISSING_AGGREGATE = new Error('Missing query aggregate');

/**
 * export the objectId class as DBObjectId
 */
const DBObjectId = ObjectId;
module.exports.DBObjectId = DBObjectId;

const DBBinary = Binary;
module.exports.DBBinary = DBBinary;

const executeQuery = (resolve, reject, callback) => {
  // if (!shouldExecute()) return;
  MongoClient.connect(dbAddress, (err, db) => {
    if (err) {
      console.log(err);
      reject(err);
    } else {
      callback(db, () => {
        db.close();
      });
    }
  });
};


/**
 * Returns array of documents based on filter. Filter is optional
 * @param {string} collectionName
 * @param {*} filter JSON object or mongo operators E.g. { username: 'admin', failLoginAttempts: { $gt: 3 } }
 * @returns Promise
 */
const readCollection = (collectionName, filter, projection) => (new Promise((resolve, reject) => executeQuery(resolve, reject, (db, closeDB) => {
  let cursor = db.collection(collectionName).find(filter || {}, projection);
  cursor.toArray((err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
    closeDB();
  });
})));

module.exports.readCollection = readCollection;

/**
 * Returns aggregate array of documents based the provided aggregate rules.
 * @param {string} collectionName
 * @param {*} aggregate JSON object or mongo aggregate E.g. [{ $group: { _id: "$state", totalPop: { $sum: "$pop" } } }, { $match: { totalPop: { $gte: 10*1000*1000 } } }]
 * @returns Promise
 */
const aggregateCollection = (collectionName, aggregate) => (new Promise((resolve, reject) => executeQuery(resolve, reject, (db, closeDB) => {
  if (!aggregate) {
    reject(MISSING_AGGREGATE);
  }
  let cursor = db.collection(collectionName).aggregate(aggregate);
  cursor.toArray((err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
    closeDB();
  });
})));

module.exports.aggregateCollection = aggregateCollection;

/**
 * Inserts multiple documents into collection
 * @param {string} collectionName
 * @param { *[] } documents Array of JSON objects
 * @returns Promise
 */
const insertDocuments = (collectionName, documents) => (
  new Promise((resolve, reject) => executeQuery(resolve, reject, (db, closeDB) => {
    db.collection(collectionName).insertMany(documents, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
      closeDB();
    });
  }))
);

module.exports.insertDocuments = insertDocuments;

/**
 * Inserts single document into collection
 * @param {string} collectionName
 * @param { * } single document
 * @returns Promise
 */
const insertDocument = (collectionName, document) => (
  new Promise((resolve, reject) => executeQuery(resolve, reject, (db, closeDB) => {
    db.collection(collectionName).insertOne(document, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
      closeDB();
    });
  }))
);

module.exports.insertDocument = insertDocument;

/**
 * Updates multiple documents based on filter with values in documents parameter
 * @param {string} collectionName
 * @param {*} filter Mandatory. JSON object or mongo operators E.g. { username: 'admin', failLoginAttempts: { $gt: 3 } }
 * @param {*} document JSON object or mongo operators, e.g. { $set: { "User.Review" : true } }
 * @param {*} options Mongo options. E.g. to support operating on multiple items: { multi: true }
 * @returns Promise
 */
const updateDocuments = (collectionName, filter, document, options) => (
  new Promise((resolve, reject) => executeQuery(resolve, reject, (db, closeDB) => {
    if (!filter) {
      reject(MISSING_FILTER);
    }
    db.collection(collectionName).update(filter, document, options, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
      closeDB();
    });
  }))
);

module.exports.updateDocuments = updateDocuments;

/**
 * Updates multiple documents based on filter with values in documents parameter
 * @param {string} collectionName
 * @param {*} filter Mandatory. JSON object or mongo operators E.g. { username: 'admin', failLoginAttempts: { $gt: 3 } }
 * @param {*} document JSON object or mongo operators, e.g. { $set: { "User.Review" : true } }
 * @param {*} options Mongo options.
 * @returns Promise
 */
const updateOneDocument = (collectionName, filter, document, options) => (
  new Promise((resolve, reject) => executeQuery(resolve, reject, (db, closeDB) => {
    if (!filter) {
      reject(MISSING_FILTER);
    }
    db.collection(collectionName).updateOne(filter, document, options || {}, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
      closeDB();
    });
  }))
);

module.exports.updateOneDocument = updateOneDocument;

/**
 * Deletes documents = require(collection based on filter.
 * @param {string} collectionName
 * @param {*} filter Mandatory. JSON object or mongo operators E.g. { username: 'admin', failLoginAttempts: { $gt: 3 } }
 * @returns Promise
 */
const deleteDocuments = (collectionName, filter) => (
  new Promise((resolve, reject) => executeQuery(resolve, reject, (db, closeDB) => {
    if (!filter) {
      reject(MISSING_FILTER);
    }
    db.collection(collectionName).deleteMany(filter, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
      closeDB();
    });
  }))
);

module.exports.deleteDocuments = deleteDocuments;

/**
 * drop the collection.
 * @param {string[]} collectionName
 * @returns Promise
 */
const dropCollection = (collectionName) => (
  new Promise((resolve, reject) => executeQuery(resolve, reject, (db, closeDB) => {
    db.collection(collectionName).drop((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
      closeDB();
    });
  }))
);

module.exports.dropCollection = dropCollection;
