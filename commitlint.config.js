// CommonJS: this package has no "type":"module" in package.json, so .js is CJS.
// `export default` here parses as ESM and breaks the husky commit-msg hook
// (commitlint loads an empty config → rules silently no-op). Use module.exports.
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      1,
      'always',
      ['types', 'utils', 'blockchain', 'config', 'deps', 'ci'],
    ],
    'subject-max-length': [2, 'always', 100],
  },
};
