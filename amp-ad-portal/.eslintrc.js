module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  rules: {
    indent: [2, 2],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "no-console": 0,
    "react/forbid-prop-types": [
      1,
      {
        forbid: ["any"]
      }
    ],
    "jsx-a11y/heading-has-content": 0,
    "prefer-destructuring": 0,
    "arrow-body-style": 0,
    "spaced-comment": 0,
    "react/destructuring-assignment": [0, "always"],
    "react/no-render-return-value": 0,
    "import/no-extraneous-dependencies": 0,
    "global-require": 0
  },
  env: {
    browser: true,
    jest: true
  },
  plugins: ["react", "jsx-a11y", "import"]
};
