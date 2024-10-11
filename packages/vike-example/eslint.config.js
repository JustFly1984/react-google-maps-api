import eslint from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
// @ts-ignore
import react from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/*",
      // Temporary compiled files
      "**/*.ts.build-*.mjs",

      // JS files at the root of the project
      "*.js",
      "*.cjs",
      "*.mjs",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": [
        1,
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-namespace": 0,
    },
  },

  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...react,
    languageOptions: {
      ...react.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },

  prettier,
);
