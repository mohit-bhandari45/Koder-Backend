const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const globals = require("globals");

module.exports = [
  {
    ignores: ["node_modules", "dist", "build"]
  },

  // Regular TypeScript files
  {
    files: ["src/**/*.ts"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module"
      },
      globals: {
        ...globals.node
      }
    },

    plugins: {
      "@typescript-eslint": tseslint
    },

    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      "quotes": ["error", "double", { "avoidEscape": true }],
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "prefer-const": "error",
      "no-unused-expressions": "error",
      "no-return-await": "error",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        { "argsIgnorePattern": "^_" }
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { "prefer": "type-imports" }
      ],

      "no-console": "off"
    }
  },

  // ✅ Type declaration files (.d.ts)
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off"
    }
  }
];
