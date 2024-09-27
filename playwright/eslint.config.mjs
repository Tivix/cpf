import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  js.configs.recommended,

  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
    'plugin:eslint-plugin-playwright/recommended',
    'prettier'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.setup.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'playwright/expect-expect': 'off',
    },
  },
  {
    ignores: ['node_modules/', 'playwright-report/', 'test-results/'],
  },
];
