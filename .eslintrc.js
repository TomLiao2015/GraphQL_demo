module.exports = {
    "extends": "standard",
    "plugins": [
        "standard",
        "promise"
    ],
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module"
    },
    "rules": {
        "semi": ["error", "always"],
        'padded-blocks': 0,
        'spaced-comment': 0,
        "no-throw-literal": 0,
        "no-multiple-empty-lines": 0,
        "no-unused-expressions": 0
    },
    "env": {
        "node": true,
        "mocha": true
    }
};
