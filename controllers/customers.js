const db = require('../mongodb/customers');
const {onError, delete_Id} = require('./helper');
module.exports.getAllCustomers = async (ctx, next) => {
  try {
    const customers = await db.getAllCustomers();
    ctx.body = delete_Id(customers);
  } catch (e) {
    onError(ctx, e);
  }

};

module.exports.getCustomersById = async (ctx, next) => {
  try {
    const customer = await db.getCustomerById(ctx.params['id']);
    ctx.body = delete_Id(customer[0]);
  } catch (e) {
    onError(ctx, e);
  }
};

module.exports.createCustomer = async (ctx, next) => {
  try {
    const customer = await db.createCustomer(ctx.request.body);
    ctx.body = delete_Id(customer[0]);
  } catch (e) {
    onError(ctx, e);
  }
};

module.exports.updateCustomer = async (ctx, next) => {
  try {
    const customer = await db.updateCustomer(ctx.params['id'], ctx.request.body);
    ctx.body = delete_Id(customer);
  } catch (e) {
    onError(ctx, e);
  }
};

module.exports.deleteCustomer = async (ctx, next) => {
  try {
    const result = await db.deleteCustomer(ctx.params['id']);
    ctx.body = delete_Id(result);
  } catch (e) {
    onError(ctx, e);
  }
};