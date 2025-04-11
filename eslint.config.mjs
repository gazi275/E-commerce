import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { ESLint } from 'eslint';



export default [
  // JavaScript support
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    ...js.configs.recommended,
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },

  // TypeScript support
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked.rules,

      // Optional custom rules
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    },
  },

  // Prettier (must be last to override formatting rules)
  {
    rules: {
      ...prettier.rules,
    },
  },
];


