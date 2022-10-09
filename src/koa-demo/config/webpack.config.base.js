const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const { APP_PATH, DIST_PATH } = require("./utils");
// debugger;
console.log(1e9, typeof process.env.NODE_ENV, process.env.NODE_ENV);
const config = {
  mode: "development",
  // target: "node",
  entry: { server: APP_PATH },
  output: {
    path: DIST_PATH,
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".js", ".json"],
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
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "dist/public" }],
    }),
  ],
  // devtool: "eval-cheap-source-map",
  externals: [nodeExternals()], // remove node_modules in bundles
  externalsPresets: { node: true }, // webpack 5 --> like `target:node`
};

module.exports = config;
// @babel/node https://babeljs.io/docs/en/babel-node  直接babel编译 + nodemon实时监控

/**
 * debugger webpack
 * chrome://inspect/#devices
 * node --inspect-brk ./node_modules/.bin/webpack --inline --progress TODO: to resolve
 */

/**
 * 检查依赖包升级
 * https://www.npmjs.com/package/npm-check-updates
 * ncu
 */
