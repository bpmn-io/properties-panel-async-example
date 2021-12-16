const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

const basePath = '.';

const absoluteBasePath = path.resolve(path.join(__dirname, basePath));

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [ '@babel/plugin-transform-react-jsx', {
                'importSource': '@bpmn-io/properties-panel/preact',
                'runtime': 'automatic'
              } ]
            ]
          }
        }
      },
      {
        test: /\.bpmn$/,
        use: {
          loader: 'raw-loader'
        }
      }
    ]
  },
  resolve: {
    mainFields: [
      'browser',
      'module',
      'main'
    ],
    alias: {
      'preact': '@bpmn-io/properties-panel/preact',
      'react': '@bpmn-io/properties-panel/preact/compat',
      'react-dom': '@bpmn-io/properties-panel/preact/compat'
    },
    modules: [
      'node_modules',
      absoluteBasePath
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'node_modules/bpmn-js/dist/assets', to: 'bpmn-js/assets' },
        { from: 'node_modules/bpmn-js-properties-panel/dist/assets', to: 'bpmn-js-properties-panel/assets' },
      ]
    })
  ]
};