const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  isOutputType,
  buildSchema,
  GraphQLInputObjectType
} = require('graphql');
const cumstomerDB = require('../mongodb/customers');

module.exports.SuccessType = new GraphQLObjectType({
  name: 'CustomerSuccess',
  fields: {
    success: {
      type: GraphQLBoolean
    },
    message: {
      type: GraphQLString
    }
  }
});
module.exports.CustomerInputType = new GraphQLInputObjectType({
  name: 'CustomerInput',
  fields: {
    id: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    birthday: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    },
    accountNumber: {
      type: GraphQLString
    },
    amount: {
      type: GraphQLFloat
    },
    currency: {
      type: GraphQLString
    }
  }
});

module.exports.CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: {
    id: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    birthday: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    },
    accountNumber: {
      type: GraphQLString
    },
    amount: {
      type: GraphQLFloat
    },
    currency: {
      type: GraphQLString
    }
  }
});

module.exports.getAllCustomers = {
  type: new GraphQLList(this.CustomerType),
  args: {},
  resolve: async (root, params, options) => {
    const customers = await cumstomerDB.getAllCustomers();
    return customers;
  }
};


module.exports.getCustomerById = {
  type: this.CustomerType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (root, params, options) => {
    const customer = await cumstomerDB.getCustomerById(params.id);
    if (customer) {
      return customer[0];
    } else {
      return {};
    }
  }
};

module.exports.createCustomer = {
  type: this.CustomerType,
  args: {
    customer: {
      name: 'customer',
      type: new GraphQLNonNull(this.CustomerInputType)
    }
  },
  resolve: async (root, params, options) => {
    const customer = await cumstomerDB.createCustomer(params.customer);
    if (customer) {
      return customer[0];
    } else {
      return {};
    }
  }
};

module.exports.updateCustomer = {
  type: this.CustomerType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    customer: {
      name: 'customer',
      type: new GraphQLNonNull(this.CustomerInputType)
    }
  },
  resolve: async (root, params, options) => {
    const customer = await cumstomerDB.updateCustomer(params.id, params.customer);
    return customer;
  }
};

module.exports.deleteCustomer = {
  type: this.SuccessType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (root, params, options) => {
    const customer = await cumstomerDB.deleteCustomer(params.id);
    return customer;
  }
};

