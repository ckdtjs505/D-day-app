const path = require("path");
const ENTRY_FILE = path.resolve(__dirname, "js");
const OUTPUT_DIR = path.join(__dirname, "dist");

console.log(ENTRY_FILE);

module.exports = {
  mode: process.env.WEBPACK_ENV,
  devtool: "inline-source-map",
  entry: ENTRY_FILE,
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  }
};
