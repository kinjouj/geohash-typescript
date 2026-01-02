import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";
import jest from "eslint-plugin-jest";
import importPlugin from "eslint-plugin-import";

export default defineConfig(
  { ignores: ["**/*.js", "**/*.mjs"] },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  stylistic.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "@stylistic": stylistic,
      "jest": jest,
      "import": importPlugin,
    },
    rules: {
      ...jest.configs["recommended"].rules,
      ...jest.configs["style"].rules,
      "curly": ["error", "all"],
      "no-empty": ["error", { allowEmptyCatch: false }],
      "no-constant-condition": "error",
      "no-restricted-imports": ["error", { "paths": ["./"] }],
      "no-unused-expressions": "error",
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "@stylistic/comma-dangle": [
        "error",
        {
          "arrays": "always-multiline",
          "objects": "always-multiline",
          "functions": "ignore",
        },
      ],
      "@stylistic/max-statements-per-line": ["error", { max: 2 }],
      "@stylistic/no-multi-spaces": [
        "error",
        {
          "exceptions": {
            "VariableDeclarator": true
          }
        }
      ],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/spaced-comment": "off",
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: ["variable", "function"],
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        {
          selector: ["typeAlias", "interface", "class", "enum"],
          format: ["PascalCase"],
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "type",
          ],
          "newlines-between": "never",
        },
      ],
    },
  },
);
