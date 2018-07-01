const uuidv4 = require('uuid/v4');
const {
  aggregateCollection,
  insertDocuments,
  readCollection,
  updateDocuments,
  deleteDocuments
} = require('./index');

const tableName = 'transactions';
module.exports.getAllTransactions = async () => {
  const results = await readCollection(tableName, {});
  return results;
};

module.exports.getTransactionsById = async (id) => {
  const result = await readCollection(tableName, {id: id});
  return result;
};

module.exports.createTransaction = async (transaction) => {
  transaction.id = uuidv4();
  transaction.tranDay = new Date();
  const result = await insertDocuments(tableName, [transaction]);
  return result.ops;
};

module.exports.updateTransactions = async (id, transaction) => {
  transaction.id = id;
  const result = await updateDocuments(tableName, {id: id}, transaction);
  if (result.result.n === 0) {
    throw new Error('transaction with ID ' + id + ' does not exist', 404);
  }
  return transaction;
};

module.exports.deleteTransaction = async (id) => {
  const result = await deleteDocuments(tableName, {id: id});
  if (result.result.n === 0) {
    throw new Error('transaction with ID ' + id + ' does not exist', 404);
  }
  return {
    success: true,
    message: 'Delete successfully!'
  };
};
