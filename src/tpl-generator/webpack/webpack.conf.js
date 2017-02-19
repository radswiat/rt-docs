import path from 'path';
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

/**
 * Babel config for:
 * - jsx babel loader
 * - eslint loader
 */
let babelrc = {
  babelrc: false,
  presets: [
    'es2015',
    'react',
    'stage-0'
  ],
  plugins: [
    'transform-runtime',
    'jsx-control-statements',
    'transform-react-constant-elements',
    'transform-react-inline-elements',
    'transform-react-remove-prop-types'
  ]
};

export default function compile(tplPath, outPath) {
  return {
    entry: path.resolve(tplPath, 'main.jsx'),

    output: {
      filename: 'bundle.js',
      path: outPath,
      libraryTarget: 'umd'
    },

    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
          query: babelrc
        },
        { test: /\.ejs$/, loader: 'ejs-loader?variable=data' },
      ]
    },

    plugins: [
      new StaticSiteGeneratorPlugin('bundle.js', [
        '/'
      ], {
        title: 'Docs'
      })
    ]
  };
}
