module.exports = {
  entry: {
    autocomplete: './src/autocomplete/autocomplete.js',
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
