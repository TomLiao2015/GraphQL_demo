const {
  GraphQLSchema,
  GraphQLObjectType
} = require('graphql');

const {getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('./customer');
const {getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction} = require('./transaction');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: {
      getAllCustomers,
      getCustomerById,
      getAllTransactions,
      getTransactionById
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createCustomer,
      updateCustomer,
      deleteCustomer,
      createTransaction,
      updateTransaction,
      deleteTransaction
    }
  })
});
