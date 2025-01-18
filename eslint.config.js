import pluginJs from '@eslint/js';
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
      rules: {
         semi: 'error',
         yoda: 'error',
         eqeqeq: 'error',
         'default-case': 'error',
         'prefer-const': 'error',
         'prefer-destructuring': 'error',
         'no-alert': 'error',
         'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
         'no-var': 'error',
         'no-empty': 'error',
         'no-multiple-empty-lines': ['error', { max: 1 }],
         'no-trailing-spaces': 'error',
         'no-unsafe-optional-chaining': [
            'error',
            { disallowArithmeticOperators: true },
         ],
         'object-curly-spacing': ['error', 'always'],
         'no-console': 'error',
         'no-import-assign': 'error',
         'no-nested-ternary': 'error',
         'no-duplicate-imports': 'error',
         'no-inner-declarations': 'error',
         'react/button-has-type': 'error',
         'react/react-in-jsx-scope': ['off'],
         'react/jsx-fragments': 'error',
      },
   },
];
