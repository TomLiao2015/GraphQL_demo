
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  isOutputType,
  GraphQLInputObjectType
} = require('graphql');
const {CustomerType} = require('./customer');
const transactionDB = require('../mongodb/transactions');
const customerDB = require('../mongodb/customers');

module.exports.TransactionInputType = new GraphQLInputObjectType({
  name: 'TransactionInput',
  fields: {
    id: {
      type: GraphQLString
    },
    customerId: {
      type: GraphQLString
    },
    tranDay: {
      type: GraphQLString
    },
    fromAccount: {
      type: GraphQLString
    },
    toAccount: {
      type: GraphQLString
    },
    tranAmount: {
      type: GraphQLFloat
    },
    tranCurrency: {
      type: GraphQLString
    }
  }
});

module.exports.TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: {
    id: {
      type: GraphQLString
    },
    customer: {
      type: CustomerType
    },
    tranDay: {
      type: GraphQLString
    },
    fromAccount: {
      type: GraphQLString
    },
    toAccount: {
      type: GraphQLString
    },
    tranAmount: {
      type: GraphQLFloat
    },
    tranCurrency: {
      type: GraphQLString
    }
  }
});


module.exports.getAllTransactions = {
  type: new GraphQLList(this.TransactionType),
  args: {},
  resolve: async (root, params, options) => {
    const transactions = await transactionDB.getAllTransactions();
    await Promise.all(transactions.map(async (item) => {
      const customer = await customerDB.getCustomerById(item.id);
      item.customer = customer;
    }));
    return transactions;
  }
};

module.exports.getTransactionById = {
  type: this.TransactionType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (root, params, options) => {
    const transaction = await transactionDB.getTransactionsById(params.id);
    if (transaction) {
      const customer = await customerDB.getCustomerById(transaction[0].id);
      transaction[0].customer = customer;
      return transaction[0];
    } else {
      return {};
    }
  }
};

module.exports.createTransaction = {
  type: this.TransactionType,
  args: {
    transaction: {
      name: 'transaction',
      type: new GraphQLNonNull(this.TransactionInputType)
    }
  },
  resolve: async (root, params, options) => {
    const transaction = await transactionDB.createTransaction(params.transaction);
    if (transaction) {
      return transaction[0];
    } else {
      return {};
    }
  }
};

module.exports.updateTransaction = {
  type: this.TransactionType,
  args: {
    transaction: {
      name: 'transaction',
      type: new GraphQLNonNull(this.TransactionInputType)
    }
  },
  resolve: async (root, params, options) => {
    const transaction = await transactionDB.updateTransactions(params.transaction);
    if (transaction) {
      return transaction[0];
    } else {
      return {};
    }
  }
};

module.exports.deleteTransaction = {
  type: this.TransactionType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (root, params, options) => {
    const transaction = await transactionDB.deleteTransaction(params.id);
    if (transaction) {
      return transaction[0];
    } else {
      return {};
    }
  }
};
