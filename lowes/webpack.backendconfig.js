var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var ROOT = path.join(__dirname, 'src');
var nodeModules = {};
fs.readdirSync('node_modules').filter(function(f) {
  return ['.bin'].indexOf(f) === -1;
}).forEach(function(mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
  entry: './src/app.js',
  output: {
    path: './public/js',
    filename: 'app.js'
  },

  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    root: ROOT,
    modulesDirectories: ['node_modules', 'src', 'src/components'],
    fallback: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'src'),  path.join(__dirname, 'src/components')]
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
      // the optional 'selfContained => runtime' transformer tells babel to require the runtime instead of inlining it.
      {test: /\.js?$/, exclude: /node_modules/, loader: 'babel?experimental&optional=runtime'}
    ]
  },

  resolveLoader: {root: path.join(__dirname, 'node_modules')},
  devtool: 'inline-source-map',
  target: 'node',
  externals: nodeModules
};
