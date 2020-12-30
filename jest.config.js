module.exports = {
  setupFiles: [
    './mockEventTarget.js',
  ],

  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
}
