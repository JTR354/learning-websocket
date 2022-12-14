module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true, // 支持对commonjs全局变量的识别
    // ecmaVersion: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
