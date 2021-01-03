module.exports = {
  setupFiles: [
    './mockEventTarget.js',
    './jestHelpers.js',
    './mockLocalStorage.js',
  ],

  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
}
