
import storybook from "eslint-plugin-storybook";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [js.configs.recommended, {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: tsParser,
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      document: "readonly",
      window: "readonly",
      alert: "readonly",
    },
  },
  plugins: {
    "@typescript-eslint": tsPlugin,
    react,
    "react-hooks": reactHooks,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    ...tsPlugin.configs.recommended.rules,

    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-undef": "off"
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}, ...storybook.configs["flat/recommended"]];
