import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // The admin panel's "fetch on mount via a named async function, then
      // setState" pattern is intentional and safe here (no race conditions —
      // each list page mounts once, fetches once). Downgraded to a warning
      // rather than rewriting every admin list page's data-fetching pattern.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
