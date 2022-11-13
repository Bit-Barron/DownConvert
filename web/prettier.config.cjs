// prettier.config.js
module.exports = {
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: "tailwind.config.cjs",
  singleQuote: false,
  trailingComma: "es5",
  arrowParens: "always",
};
