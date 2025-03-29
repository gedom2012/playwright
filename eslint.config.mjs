import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import playwright from 'eslint-plugin-playwright';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
const { configs: typescriptConfigs } = typescript;

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...typescriptConfigs.recommended.rules,
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**', 'page-objects/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js, '@typescript-eslint': typescript },
    extends: ['js/recommended'],
  },
  tseslint.configs.recommended,
]);
