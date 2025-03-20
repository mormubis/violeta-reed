import eslint from '@eslint/js';
import parser from '@typescript-eslint/parser';
import { globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import importing from 'eslint-plugin-import-x';
import react from 'eslint-plugin-react';
import * as hooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import * as typescript from 'typescript-eslint';

export default typescript.config(
  globalIgnores(['*/.graphql/*']),
  eslint.configs.recommended,
  prettier,
  ...typescript.configs.strict,
  ...typescript.configs.stylistic,
  importing.flatConfigs.recommended,
  importing.flatConfigs.typescript,
  /**
   * Common
   */
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
      parser: parser,
      sourceType: 'module',
    },
    plugins: { import: importing },
    rules: {
      // We use prettier everywhere else
      // eslint-disable-next-line import-x/no-named-as-default-member
      ...prettier.rules,
      'arrow-body-style': ['error', 'as-needed'],
      'import/order': [
        'error',
        {
          'alphabetize': {
            caseInsensitive: true,
            order: 'asc',
          },
          'groups': [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'type'],
          'newlines-between': 'always',
          'pathGroups': [
            {
              group: 'internal',
              pattern: '@/**',
            },
          ],
          'pathGroupsExcludedImportTypes': ['@/**'],
        },
      ],
      'no-async-promise-executor': 'warn',
      'no-console': 'warn',
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      'sort-keys': 'error',
    },
  },
  /**
   * TypeScript
   */
  {
    files: ['**/*.{mts,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': {
            descriptionFormat: '^: TS\\d+ because .+$',
          },
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json'],
        },
      },
    },
  },
  /**
   * React
   */
  {
    files: ['**/*.{tsx,mtsx}'],
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'],
    plugins: { react, 'react-hooks': hooks },
    rules: {
      ...hooks.configs.recommended.rules,
      'react/jsx-sort-props': ['error', { callbacksLast: true, reservedFirst: true, shorthandFirst: true }],
      'react/self-closing-comp': 'error',
    },
  },
);
