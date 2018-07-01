const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const Router = require('koa-router');
const {getAllCustomers,
  getCustomersById,
  createCustomer,
  updateCustomer,
  deleteCustomer} = require('../controllers/customers');
const {getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction} = require('../controllers/transactions');
const schema = require('../graphql/schema');

// ROUTES
const router = new Router({
  prefix: '/demo'
});

router.get('/customers', getAllCustomers);
router.get('/customers/:id', getCustomersById);
router.post('/customers', createCustomer);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);

router.get('/transactions', getAllTransactions);
router.get('/transactions/:id', getTransactionById);
router.post('/transactions', createTransaction);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);

router.get('/graphql', graphqlKoa({ schema: schema }));
router.post('/graphql', graphqlKoa({ schema: schema }));
router.get(
  '/graphiql',
  graphiqlKoa({
    endpointURL: '/demo/graphql' // a POST endpoint that GraphiQL will make the actual requests to
  })
);

module.exports = router;
