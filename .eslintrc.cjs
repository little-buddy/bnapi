module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'perfectionist'],
  rules: {
    'prettier/prettier': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    /* typescript */
    '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-expect-error': 'allow-with-description' },
    ],
    /* perfectionist */
    'perfectionist/sort-imports': [
      'error',
      {
        'type': 'line-length',
        'order': 'asc',
        'groups': [
          'type',
          'react',
          'nanostores',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'side-effect',
          'style',
          'object',
          'unknown',
        ],
        'custom-groups': {
          value: {
            react: ['react', 'react-*'],
            nanostores: '@nanostores/**',
          },
          type: {
            react: 'react',
          },
        },
        'newlines-between': 'always',
        'internal-pattern': ['@/**'],
      },
    ],
    'perfectionist/sort-array-includes': [
      'error',
      {
        'type': 'line-length',
        'order': 'asc',
        'spread-last': true,
      },
    ],
    'perfectionist/sort-exports': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
      },
    ],
    'perfectionist/sort-named-exports': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
      },
    ],
    'perfectionist/sort-named-imports': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
      },
    ],
    // 'perfectionist/sort-vue-attributes': [
    //   'error',
    //   {
    //     type: 'line-length',
    //     order: 'asc',
    //     groups: ['multiline', 'unknown', 'shorthand']
    //   }
    // ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
      },
    },
    'import/extensions': ['.js', '.ts', '.mjs', '.jsx', '.tsx'],
  },
};
