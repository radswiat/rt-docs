import path from 'path';
import webpack from 'webpack';
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');
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

export default function compile(docsData, tplPath, outPath) {

  /**
   * Create possible routes for react
   * - static router will render by this pattern
   * TODO: make it nicer
   */
  let routes = (() => {
    return docsData.map((data) => {
      return data.route;
    });
  })();

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
        {
          test: /\.ejs$/,
          loader: 'ejs-loader?variable=data'
        }
      ]
    },

    plugins: [
      new ExtendedDefinePlugin({
        APP_DATA: {
          docs: docsData
        }
      }),
      new StaticSiteGeneratorPlugin('bundle.js', routes, {
        title: 'Docs'
      })
    ]
  };
}
