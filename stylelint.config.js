module.exports = {
  'extends': [
    'stylelint-config-recommended',
    'stylelint-config-standard',
    'stylelint-config-css-modules'
  ],
  'plugins': [
    'stylelint-a11y',
    'stylelint-css-modules',
    'stylelint-high-performance-animation'
  ],
  'rules': {
    'plugin/no-low-performance-animation-properties': true,

    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'comment-empty-line-before': ['always', {
      'ignore': ['stylelint-commands', 'after-comment']
    }],
    'declaration-colon-space-after': 'always',
    'indentation': 2,
    'color-hex-length': 'short',
    'color-hex-case': 'upper',
    'max-empty-lines': 2,
    'rule-empty-line-before': ['always', {
      'except': ['first-nested'],
      'ignore': ['after-comment']
    }],
    'unit-whitelist': ['rem', 'vh', 'vw', '%', 'px', 's']
  }
}
