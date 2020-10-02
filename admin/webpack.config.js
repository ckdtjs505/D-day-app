const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  target: "node",
  // watch: true,
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};
