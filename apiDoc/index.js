const requireDir = require('require-dir');
const apiSpecPathsAndDefinitions = requireDir('./spec');

let paths = {};
let definitions = {};

Object.keys(apiSpecPathsAndDefinitions).forEach(item => {
  if (apiSpecPathsAndDefinitions[item].paths) {
    paths = {
      ...paths,
      ...apiSpecPathsAndDefinitions[item].paths
    };
  }

  if (apiSpecPathsAndDefinitions[item].definitions) {
    definitions = {
      ...definitions,
      ...apiSpecPathsAndDefinitions[item].definitions
    };
  }
});


const apiSpec = {
  swagger: '2.0',
  info: {
    title: 'Demo API',
    version: '1.0.0'
  },
  schemes: [
    'http',
    'https'
  ],
  basePath: '/demo',
  consumes: [
    'application/json'
  ],
  produces: [
    'application/json'
  ],
  responses: {
    DeleteSuccessFull: {
      description: 'Delete successfully',
      'type': 'object',
      properties: {
        'success': {
          'type': 'string'
        },
        'message': {
          'type': 'string'
        }
      }
    }
  },
  paths,
  definitions
};

module.exports = apiSpec;
