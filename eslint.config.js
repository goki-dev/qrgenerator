import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([

  // ⭐ CUSTOM FIX
  // Prevent ESLint from checking build output and dependencies
  // This is IMPORTANT because Vite generates "dist/" and it is NOT source code
  {
    ignores: ["dist/**", "node_modules/**"]
  },

  // =========================
  // JavaScript + Browser setup
  // =========================
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],

    // ESLint recommended JavaScript rules
    plugins: { js },
    extends: ["js/recommended"],

    // Tell ESLint this code runs in a browser environment
    // so globals like window, document, fetch are allowed
    languageOptions: {
      globals: globals.browser
    }
  },

  // =========================
  // React rules
  // =========================
  pluginReact.configs.flat.recommended,

  {
    rules: {
      // React 17+ does NOT require React import in every file
      'react/react-in-jsx-scope': 'off',

      // Disables prop-types validation requirement
      // (commonly turned off in modern React projects)
      'react/prop-types': 'off'
    }
  },

  // =========================
  // Test files (Vitest)
  // =========================
  {
    files: ["**/*.test.{js,jsx}"],

    languageOptions: {
      globals: {

        // Vitest global test utilities
        // from :contentReference[oaicite:0]{index=0}

        vi: 'readonly',          // mocking + spies (vi.fn)
        describe: 'readonly',    // test grouping
        it: 'readonly',          // individual test case
        expect: 'readonly',      // assertions

        // lifecycle hooks
        beforeEach: 'readonly',
        afterEach: 'readonly'
      }
    }
  }
]);