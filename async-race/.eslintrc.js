module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['import'],
  rules: {
    'global-require': 'error',
    'import/extensions': ['error', 'always', { ts: 'never' }],
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-use-before-define': ['error', { variables: false }],
  },
};
