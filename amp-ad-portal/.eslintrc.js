module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  rules: {
    indent: [2, 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "no-console": 0
  },
  plugins: ["react", "jsx-a11y", "import"]
};
