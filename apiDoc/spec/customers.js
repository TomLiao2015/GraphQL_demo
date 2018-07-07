module.exports.definitions = {
  'customer': {
    'type': 'object',
    'properties': {
      'id': {
        'type': 'string'
      },
      'firstName': {
        'type': 'string'
      },
      'lastName': {
        'type': 'string'
      },
      'birthday': {
        'type': 'string'
      },
      'country': {
        'type': 'string'
      },
      'accountNumber': {
        'type': 'string'
      },
      'amount': {
        'type': 'number'
      },
      'currency': {
        'type': 'string'
      }
    }
  }
};
module.exports.paths = {
  '/customers': {
    'get': {
      'summary': 'Get Customer data',
      'description': 'Get all of the customers',
      'tags': [
        'Customers'
      ],
      'responses': {
        200: {
          'description': 'Successful response. Return all customer info',
          'schema': {
            'type': 'array',
            'items': {
              $ref: '#/definitions/customer'
            }
          }
        }
      }
    },
    post: {
      summary: 'Create the customer',
      description: 'Create the customer',
      parameters: [
        {
          name: 'body',
          in: 'body',
          schema: {
            $ref: '#/definitions/customer'
          },
          required: true,
          description: 'Customer data to be added to the database.'
        }
      ],
      tags: [
        'Customers'
      ],
      responses: {
        200: {
          description: 'Successful response.',
          schema: {
            $ref: '#/definitions/customer'
          }
        }
      }
    }
  },
  '/customers/{id}': {
    'get': {
      'summary': 'Get customer',
      'description': 'Get  customer .',
      'parameters': [
        {
          'in': 'path',
          'name': 'id',
          'type': 'string',
          'required': true
        }
      ],
      'tags': [
        'Customers'
      ],
      'responses': {
        200: {
          'description': 'Reutrn customer',
          'schema': {
            $ref: '#/definitions/customer'
          }
        }
      }
    },
    put: {
      summary: 'Update the customer',
      description: 'Update the customer',
      parameters: [
        {
          name: 'body',
          in: 'body',
          schema: {
            $ref: '#/definitions/customer'
          },
          required: true,
          description: 'New customer object that will replace the old one.'
        },
        {
          'in': 'path',
          'name': 'id',
          'type': 'string',
          'required': true
        }
      ],
      tags: [
        'Customers'
      ],
      responses: {
        200: {
          description: 'Successful response.',
          schema: {
            $ref: '#/definitions/customer'
          }
        }
      }
    },
    delete: {
      summary: 'Delete customer',
      description: 'Delete the customer',
      parameters: [
        {
          'in': 'path',
          'name': 'id',
          'type': 'string',
          'required': true
        }
      ],
      tags: [
        'Customers'
      ],
      responses: {
        200: {
          description: 'Successful response',
          schema: {
            $ref: '#/responses/DeleteSuccessFull'
          }
        }
      }
    }
  }
};
