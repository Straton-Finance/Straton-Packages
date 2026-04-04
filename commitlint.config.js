export default {
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
