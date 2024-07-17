module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "react/react-in-jsx-scope": "off",
    "import/no-unresolved": "off",
    "react/prop-types": "off",
  },
};
