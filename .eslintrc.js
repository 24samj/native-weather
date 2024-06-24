module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    // Add rule to enforce end-of-line characters
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    // Ignore missing semicolons
    semi: ['error', 'never'],
    // Allow extra semicolons at the end of anything
    'no-extra-semi': 'on',
    // Allow spaces inside brackets
    'object-curly-spacing': ['error', 'always'],
  },
};
