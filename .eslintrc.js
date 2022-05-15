module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    project: ['./tsconfig.json'], // Specify it only for TypeScript files
    createDefaultProgram: true,
  },
  rules: {
    'no-useless-return': 'off',
    'no-else-return': 'off',
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'object-curly-newline': 'off',
    'import/no-unresolved': 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', 'tsx'] }],
    'import/extensions': ['off'],
    'react/require-default-props': 'off',
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['src', 'node_modules'],
      },
    },
  },
};
