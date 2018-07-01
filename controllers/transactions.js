const db = require('../mongodb/transactions');
const {onError, delete_Id} = require('./helper');
module.exports.getAllTransactions = async (ctx, next) => {
  try {
    const transactions = await db.getAllTransactions();
    ctx.body = delete_Id(transactions);
  } catch (e) {
    onError(ctx, e);
  }

};

module.exports.getTransactionById = async (ctx, next) => {
  try {
    const transaction = await db.getTransactionsById(ctx.params['id']);
    ctx.body = delete_Id(transaction[0]);
  } catch (e) {
    onError(ctx, e);
  }
};

module.exports.createTransaction = async (ctx, next) => {
  try {
    const customer = await db.createTransaction(ctx.request.body);
    ctx.body = delete_Id(customer[0]);
  } catch (e) {
    onError(ctx, e);
  }
};

module.exports.updateTransaction = async (ctx, next) => {
  try {
    const customer = await db.updateTransactions(ctx.params['id'], ctx.request.body);
    ctx.body = delete_Id(customer);
  } catch (e) {
    onError(ctx, e);
  }
};

module.exports.deleteTransaction = async (ctx, next) => {
  try {
    const result = await db.deleteTransaction(ctx.params['id']);
    ctx.body = delete_Id(result);
  } catch (e) {
    onError(ctx, e);
  }
};
