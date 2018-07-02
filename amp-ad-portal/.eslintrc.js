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
    "react/destructuring-assignment": [0, "always"]
  },
  env: {
    browser: true
  },
  plugins: ["react", "jsx-a11y", "import"]
};
