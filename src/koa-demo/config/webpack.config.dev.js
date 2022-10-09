const { merge } = require("webpack-merge");

const base = require("./webpack.config.base");

const config = merge(base, {
  devtool: "eval-cheap-source-map",
  mode: "development",
  stats: { children: false },
});

module.exports = config;
