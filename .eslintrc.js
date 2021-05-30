module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint',
    'prefer-arrow',
    'jest',
    'import',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'jest/no-jasmine-globals': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: [
          '**.expect',
          'request.*.expect',
          'request.**.expect',
          'request.*.expect*',
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['**/**.e2e-spec.ts', 'test/**/*'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
  ],
};
