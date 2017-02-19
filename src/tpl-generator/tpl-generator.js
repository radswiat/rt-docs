import chalk from 'chalk';
import webpack from 'webpack';
import gutil from 'gutil';
import path from 'path';
import webpackConfig from './webpack/webpack.conf';

export default class TplGenerator {

  constructor(docs) {
    console.log(chalk.green('tpl-generator'));
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
      gutil.log('[webpack:build]', stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true
      }));
    });
  }
}

let tg = new TplGenerator();
tg.compile();
