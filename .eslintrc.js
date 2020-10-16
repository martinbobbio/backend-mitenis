module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'comma-dangle': 'off',
    'linebreak-style': 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': 'off',
    indent: 'off',
    "semi": 'off'
  }
};
