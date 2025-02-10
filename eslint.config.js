import pluginJs from '@eslint/js';
import checkFile from 'eslint-plugin-check-file';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
   {
      languageOptions: {
         globals: globals.browser,
      },
   },
   pluginJs.configs.recommended,
   ...tseslint.configs.recommended,
   pluginReact.configs.flat.recommended,
   {
      plugins: {
         'check-file': checkFile,
      },
      rules: {
         "no-unused-vars": "off",
         "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: '^_' }],
         semi: 'error',
         yoda: 'error',
         eqeqeq: 'error',
         'default-case': 'error',
         'prefer-const': 'error',
         'prefer-destructuring': 'error',
         'no-alert': 'error',
         'no-var': 'error',
         'no-empty': 'error',
         'no-multiple-empty-lines': ['error', { max: 1 }],
         'no-trailing-spaces': 'error',
         'no-unsafe-optional-chaining': [
            'error',
            { disallowArithmeticOperators: true },
         ],
         'object-curly-spacing': ['error', 'always'],
         'no-console': 'warn',
         'no-import-assign': 'error',
         'no-nested-ternary': 'error',
         'no-duplicate-imports': 'error',
         'no-inner-declarations': 'error',
         '@typescript-eslint/no-explicit-any': 'warn',
         'react/button-has-type': 'error',
         'react/react-in-jsx-scope': ['off'],
         'react/jsx-fragments': 'error',
         'check-file/filename-naming-convention': [
            'error',
            {
               '**/*.{ts,tsx}': 'KEBAB_CASE',
            },
            {
               ignoreMiddleExtensions: true,
            },
         ],
      },
   },
   {
      plugins: {
         'check-file': checkFile,
      },
      files: ['src/**/!(__tests__)/*'],
      rules: {
         'check-file/folder-naming-convention': [
            'error',
            {
               '**/*': 'KEBAB_CASE',
            },
         ],
      },
   },
];
