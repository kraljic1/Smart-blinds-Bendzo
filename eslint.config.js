import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Enforce 200-line limit
      'max-lines': [
        'error',
        {
          max: 200,
          skipBlankLines: true,
          skipComments: true
        }
      ],
      // Additional code quality rules
      'max-lines-per-function': [
        'warn',
        {
          max: 50,
          skipBlankLines: true,
          skipComments: true
        }
      ],
      'complexity': ['warn', 10],
      'max-depth': ['warn', 4],
      'max-params': ['warn', 4]
    },
  },
  // Override for legacy data files
  {
    files: [
      'src/data/customizationOptions.ts',
      'src/data/collections/classicCollection.ts',
      'src/data/collections/essentialCollectionPart1.ts',
      'src/data/collections/essentialCollectionPart2.ts'
    ],
    rules: {
      'max-lines': 'off'
    }
  }
);
