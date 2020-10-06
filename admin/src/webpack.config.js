const path = require("path");
const ENTRY_FILE = path.resolve(__dirname, "js");
const OUTPUT_DIR = path.join(__dirname, "dist");

module.exports = {
  mode: process.env.WEBPACK_ENV,
  devtool: "inline-source-map",
  entry: ENTRY_FILE,
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  }
};
