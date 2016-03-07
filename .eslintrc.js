module.exports = {
    "env": {
        "es6": true,
        "commonjs": true

    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "no-var": 2,
        "prefer-const": 2,
        "prefer-arrow-callback": 2,
        "no-process-env": 0,
        "no-console": 0,
        "indent": [
            2,
            4
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "quotes": [
            2,
            "single"
        ],
        "semi": [
            2,
            "never"
        ]
    }
};