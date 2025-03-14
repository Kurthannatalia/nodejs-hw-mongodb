import globals from 'globals';
import pluginJs from '@eslint/js';
export default [
  pluginJs.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        'process.env': 'readonly',
      },
    },
    env: {
      node: true,
    },
    rules: {
      semi: 'error',
      'no-unused-vars': ['error', {
        args: 'none'
      }],
      'no-undef': 'error',
    },
  },
];