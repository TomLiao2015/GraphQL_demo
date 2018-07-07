module.exports.definitions = {
  'transaction': {
    'type': 'object',
    'properties': {
      'id': {
        'type': 'string'
      },
      'customerId': {
        'type': 'string'
      },
      'tranDay': {
        'type': 'string'
      },
      'tranAmount': {
        'type': 'number'
      },
      'tranCurrency': {
        'type': 'string'
      },
      'fromAccount': {
        'type': 'string'
      },
      'toAccount': {
        'type': 'number'
      }
    }
  }
};
module.exports.paths = {
  '/transactions': {
    'get': {
      'summary': 'Get transactions data',
      'description': 'Get all of the transactions',
      'tags': [
        'Transactions'
      ],
      'responses': {
        200: {
          'description': 'Successful response. Return all transaction info',
          'schema': {
            'type': 'array',
            'items': {
              $ref: '#/definitions/transaction'
            }
          }
        }
      }
    },
    post: {
      summary: 'Create the transaction',
      description: 'Create the transaction',
      parameters: [
        {
          name: 'body',
          in: 'body',
          schema: {
            $ref: '#/definitions/transaction'
          },
          required: true,
          description: 'Transaction data to be added to the database.'
        }
      ],
      tags: [
        'Transactions'
      ],
      responses: {
        200: {
          description: 'Successful response.',
          schema: {
            $ref: '#/definitions/transaction'
          }
        }
      }
    }
  },
  '/transactions/{id}': {
    'get': {
      'summary': 'Get transaction',
      'description': 'Get  transaction .',
      'parameters': [
        {
          'in': 'path',
          'name': 'id',
          'type': 'string',
          'required': true
        }
      ],
      'tags': [
        'Transactions'
      ],
      'responses': {
        200: {
          'description': 'Return transaction',
          'schema': {
            $ref: '#/definitions/transaction'
          }
        }
      }
    },
    put: {
      summary: 'Update the transaction',
      description: 'Update the transaction',
      parameters: [
        {
          name: 'body',
          in: 'body',
          schema: {
            $ref: '#/definitions/transaction'
          },
          required: true,
          description: 'New transaction object that will replace the old one.'
        },
        {
          'in': 'path',
          'name': 'id',
          'type': 'string',
          'required': true
        }
      ],
      tags: [
        'Transactions'
      ],
      responses: {
        200: {
          description: 'Successful response.',
          schema: {
            $ref: '#/definitions/transaction'
          }
        }
      }
    },
    delete: {
      summary: 'Delete transaction',
      description: 'Delete the transaction',
      parameters: [
        {
          'in': 'path',
          'name': 'id',
          'type': 'string',
          'required': true
        }
      ],
      tags: [
        'Transactions'
      ],
      responses: {
        200: {
          description: 'Successful response. The map data is deleted',
          schema: {
            $ref: '#/responses/DeleteSuccessFull'
          }
        }
      }
    }
  }
};
