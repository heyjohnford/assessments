var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var ROOT = path.join(__dirname, 'src');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var reactReplace = new webpack.NormalModuleReplacementPlugin(/^react$/i, 'react/addons');

module.exports = {
  entry: './src/bundle.js',
  output: {
    path: './public/js',
    filename: 'bundle.js'
  },

  resolveLoader: {root: path.join(__dirname, 'node_modules')},
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    root: ROOT,
    modulesDirectories: ['node_modules', 'src', 'src/components'],
    fallback: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'src'), path.join(__dirname, 'src/components')]
  },
  module: {
    loaders: [
      { test: /\.css/, loader: "style-loader!css-loader" },
      { test: /\.html/, loader: "html-loader" },
      { test: /\.gif/, loader: "url-loader?limit=10000&minetype=image/gif" },
      { test: /\.jpg/, loader: "url-loader?limit=10000&minetype=image/jpg" },
      { test: /\.png/, loader: "url-loader?limit=10000&minetype=image/png" },
      {test: /\.json$/, loader: 'json-loader'},
      { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
      // the optional 'selfContained => runtime' transformer tells babel to require the runtime instead of inlining it.
      {test: /\.js?$/, exclude: /node_modules/, loader: 'babel?experimental&optional=runtime'}
    ]
  },
  plugins: [commonsPlugin, reactReplace],
  devtool: 'inline-source-map'
};
