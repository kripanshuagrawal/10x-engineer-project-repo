module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    requireConfigFile: false, // Allows using Babel parser without a separate Babel config
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // Recommended React settings
  ],
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect', // Automatically detect the version of React
    },
  },
  rules: {
    // Add custom rules here if needed
  },
};