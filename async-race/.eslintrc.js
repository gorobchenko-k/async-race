module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['import', 'prettier'],
  rules: {
    'global-require': 'error',
    'import/extensions': ['error', 'always', { ts: 'never' }],
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-use-before-define': ['error', { variables: false }],
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/array-type': [
      'error',
      {
        'default': 'array'
      }
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        'accessibility': 'explicit',
        'overrides': {
          'accessors': 'explicit',
          'constructors': 'off',
          'methods': 'explicit',
          'properties': 'explicit',
          'parameterProperties': 'explicit'
        }
      }
    ],
    'max-lines-per-function': [
      'error',
      40
    ],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error'
  },
};
