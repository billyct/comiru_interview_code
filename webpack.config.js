module.exports = {
  entry: {
    autocomplete: './src/autocomplete/index.js',
  },

  watchOptions: {
    ignored: [
      'dist/**',
      'example/**',
      'node_modules/**',
      'test/**',
    ]
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
