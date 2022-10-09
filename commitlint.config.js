module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "revert", "chore"]],
    "subject-max-length": [1, "always", 300],
  },
};
