import eslintConfigPrettier from 'eslint-config-prettier/flat';
import pluginReact from 'eslint-plugin-react';
import { globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import pluginJs from '@eslint/js';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  eslintConfigPrettier,
  globalIgnores([
    'dist/',
    'build/',
    '.vscode/',
    '.history/',
    'coverage/',
    'node_modules/'
  ]),
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];
