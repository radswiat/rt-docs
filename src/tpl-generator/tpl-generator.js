import chalk from 'chalk';
import webpack from 'webpack';
import gutil from 'gutil';
import path from 'path';
import webpackConfig from './webpack/webpack.conf';

console.log(chalk.green('tpl-generator'));

let compiler = webpack(
  webpackConfig(
    path.resolve(
      process.cwd(), './src/tpl-generator/templates/default/'
    ),
    path.resolve(
      process.cwd(), './output/'
    )
  )
);

compiler.run((err, stats) => {
  gutil.log('[webpack:build]', stats.toString({
    chunks: false, // Makes the build much quieter
    colors: true
  }));
});
