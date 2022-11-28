module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:unicorn/all',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'unicorn', 'prettier', 'react-hooks'],
  rules: {
    indent: 0,
    curly: 'error',
    'no-console': 2,
    'no-debugger': 2,
    'no-else-return': 1,
    semi: [1, 'always'],
    'space-unary-ops': 2,
    'react/prop-types': 0,
    'no-unused-vars': 'off',
    'consistent-return': 'warn',
    'react/display-name': 'off',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true
      }
    ],
    'unicorn/no-null': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/prefer-node-protocol': 0,
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-keyword-prefix': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-uses-react': 'off',
    'no-extra-boolean-cast': 'off',
    'no-restricted-exports': 'off',
    'prettier/prettier': ['error'],
    'react/no-multi-comp': 'error',
    'no-underscore-dangle': ['error'],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: true
      }
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement'
    ],
    'import/no-unresolved': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/resolver': { typescript: {} }
  }
};
