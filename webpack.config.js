module.exports = {
  entry: {
    autocomplete: './src/autocomplete/autocomplete.js',
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
