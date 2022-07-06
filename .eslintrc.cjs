const rules = {
  ON: 2,
  OFF: 0,
  WARN: 1,
};

module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'jest'],
  env: {
    node: true,
    browser: true,
    es2022: true, // this sets the parserOptions.ecmaVersion option automagically
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
    project: ['./tsconfig.eslint.json'],
  },
  ignorePatterns: ['dist', 'coverage'],
  rules: {
    '@typescript-eslint/no-namespace': rules.OFF,
    '@typescript-eslint/no-explicit-any': rules.OFF,
    '@typescript-eslint/no-unsafe-assignment': rules.WARN,
    '@typescript-eslint/no-unsafe-member-access': rules.WARN,
    '@typescript-eslint/no-unsafe-call': rules.WARN,
    '@typescript-eslint/no-unsafe-return': rules.WARN,
  },
};
