module.exports = {
  setupFiles: [
    './mockEventTarget.js',
    './jestHelpers.js',
  ],

  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
}
