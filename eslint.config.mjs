import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    files: ["app/**/*.{ts,tsx}"],
    ignores: ["app/extension-cord-gauge-calculator/**"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value='FAQPage']",
          message: "Use guideFaq from @/components/guide-faq.",
        },
      ],
    },
  },
]);

export default eslintConfig;
