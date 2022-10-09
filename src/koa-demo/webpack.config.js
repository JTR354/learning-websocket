const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// debugger;

const config = {
  mode: "development",
  // target: "node",
  entry: { server: path.join(__dirname, "./index.js") },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  devtool: "eval-cheap-source-map",
  externals: [nodeExternals()], // remove node_modules in bundles
  externalsPresets: { node: true }, // webpack 5 --> like `target:node`
};

console.info(config);
module.exports = config;
// @babel/node https://babeljs.io/docs/en/babel-node  直接babel编译 + nodemon实时监控

/**
 * debugger webpack
 * chrome://inspect/#devices
 * node --inspect-brk ./node_modules/.bin/webpack --inline --progress TODO: to resolve
 */
