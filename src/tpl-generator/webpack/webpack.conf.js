import path from 'path';
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    entry: path.resolve(tplPath, 'app/main.jsx'),

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
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader?sourceMap',
            use: [
              'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
              'sass-loader?sourceMap'
            ]
          })
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css'
        }
      ]
    },

    plugins: [
      new ExtendedDefinePlugin({
        APP_DATA: {
          docs: docsData
        }
      }),
      new ExtractTextPlugin('styles.css'),
      new StaticSiteGeneratorPlugin('bundle.js', routes, {
        title: 'Docs'
      })
    ]
  };
}
