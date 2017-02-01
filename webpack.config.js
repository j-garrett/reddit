const path = require('path');

module.exports = {
  context: path.join(__dirname, './src'),
  entry: './app.jsx',
  output: {
    path: './src/js',
    filename: 'compiled-app.js',
  },
  'devtool': 'inline-source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};
