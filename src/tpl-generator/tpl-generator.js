import chalk from 'chalk';
import webpack from 'webpack';
import path from 'path';
import gutil from 'gutil';
import webpackConfig from './webpack/webpack.conf';

export default class TplGenerator {

  constructor(docs) {
    this.docs = docs;
  }

  compile() {
    webpack(
      webpackConfig(
        this.docs,
        path.resolve(
          process.cwd(), './src/tpl-generator/templates/default/'
        ),
        path.resolve(
          process.cwd(), './output/'
        )
      )
    ).run((err, stats) => {
      if (err) {
        console.log(`${chalk.yellow.bold('> [rtdoc] ')}${chalk.red.bold('webpack failed')}`);
        console.log(err);
      }
      gutil.log('[webpack:build]', stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true
      }));
    });
  }
}
//
// let tg = new TplGenerator();
// tg.compile();
