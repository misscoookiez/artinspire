import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    // Existing client screens intentionally hydrate preferences and route state
    // after mount. Keep these migration findings visible without turning the
    // newly restored lint command into a release blocker.
    rules: {
      "@next/next/no-html-link-for-pages": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "tmp/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
