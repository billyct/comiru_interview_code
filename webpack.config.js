module.exports = {
  entry: {
    autocomplete: './src/autocomplete/index.js',
    lazy: './src/lazy/index.js',
    news: './src/news/index.js',
  },

  watchOptions: {
    ignored: [
      'dist/**',
      'example/**',
      'node_modules/**',
      'src/**/__test__/**',
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
