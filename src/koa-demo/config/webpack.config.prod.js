const { merge } = require("webpack-merge");

const base = require("./webpack.config.base");

const config = merge(base, {
  mode: "production",
  stats: { children: false, warnings: false, errorDetails: true },
});

module.exports = config;
