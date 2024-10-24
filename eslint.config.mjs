import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importing from 'eslint-plugin-import-x';
import a11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
// import hooks from 'eslint-plugin-react-hooks';
import tailwind from 'eslint-plugin-tailwindcss';
import rtl from 'eslint-plugin-testing-library';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat();

export default tseslint.config(
  eslint.configs.recommended,
  prettier,
  ...tailwind.configs['flat/recommended'],
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  ...compat.config(importing.configs.recommended),
  ...compat.config(importing.configs.typescript),
  /**
   * Common
   */
  {
    files: ['**/*.{cjs,js,jsx,mjs,mts,ts,tsx}'],
    plugins: { import: importing },
    rules: {
      ...prettier.rules,
      'import/order': [
        'error',
        {
          'alphabetize': {
            caseInsensitive: true,
            order: 'asc',
          },
          'groups': [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling'],
            'type',
          ],
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
      '@typescript-eslint/consistent-type-imports': 'error',
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
    files: ['**/*.{jsx,tsx}'],
    ...react.configs.flat.recommended,
    plugins: {
      'jsx-a11y': a11y,
      react,
      // 'react-hooks': hooks,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      // ...hooks.configs.recommended.rules,
      ...a11y.configs.recommended.rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  /**
   * Testing Library
   */
  {
    files: ['**/*.{test,spec}.{cjs,js,jsx,mjs,mts,ts,tsx}'],
    ...rtl.configs.recommended,
    ...rtl.configs.dom,
    ...rtl.configs.react,
  },
);
