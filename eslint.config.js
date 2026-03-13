import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
  {
    ignores: ['node_modules', 'dist', 'coverage', '**/*.d.ts'],
  },
  {
    files: ["packages/form-types/**/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off"
    }
  },
  {
    files: [
      "packages/demo/**/*.ts",
      "packages/demo/**/*.tsx",
      "packages/form-react/**/*.ts",
      "packages/form-react/**/*.tsx",
      "packages/form-builder/**/*.ts",
      "packages/form-validation/**/*.ts",
    ],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "ignoreRestSiblings": true,
          "args": "after-used",
          "caughtErrors": "none"
        }
      ],
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];