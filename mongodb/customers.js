const uuidv4 = require('uuid/v4');
const {
  aggregateCollection,
  insertDocuments,
  readCollection,
  updateDocuments,
  deleteDocuments
} = require('./index');

const tableName = 'customers';
module.exports.getAllCustomers = async () => {
  const results = await readCollection(tableName, {});
  return results;
};

module.exports.getCustomerById = async (id) => {
  const result = await readCollection(tableName, {id: id});
  return result;
};

module.exports.createCustomer = async (customer) => {
  customer.id = uuidv4();
  const result = await insertDocuments(tableName, [customer]);
  return result.ops;
};

module.exports.updateCustomer = async (id, customer) => {
  customer.id = id;
  const result = await updateDocuments(tableName, {id: id}, customer);
  if (result.result.n === 0) {
    throw new Error('customer with ID ' + id + ' does not exist', 404);
  }
  return customer;
};

module.exports.deleteCustomer = async (id) => {
  const result = await deleteDocuments(tableName, {id: id});
  if (result.result.n === 0) {
    throw new Error('customer with ID ' + id + ' does not exist', 404);
  }
  return {
    success: true,
    message: 'Delete successfully!'
  };
};
