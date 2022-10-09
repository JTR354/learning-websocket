const path = require("path");

exports.resolves = function (dir) {
  return path.join(__dirname, "..", dir);
};

exports.APP_PATH = exports.resolves("index.js");

exports.DIST_PATH = exports.resolves("dist");
