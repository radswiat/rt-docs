import chalk from 'chalk';
import Promise from 'bluebird';
import { transform } from 'babel-core';
import { loadFile, log } from './utils';
import TplGenerator from './tpl-generator/tpl-generator';
import optimist from 'optimist';
import AstTraverse from './ast-traverse/ast-traverse';
import glob from 'glob';

class RtDocs {

  /**
   * Create static instance
   * @param config
   * @returns {RtDocs}
   */
  static create(config) {
    return new RtDocs(config);
  }

  constructor(config) {
    this.config = config;
  }

  async start() {
    console.log(`${chalk.yellow.bold('> [rtdoc] ')}${chalk.green.bold('start')}`);
    let ast = await this.parseAST();
    this.generateTemplates(ast);
  }

  async parseAST() {
    let docsAst = [];
    console.log(`${chalk.yellow.bold('> [rtdoc] ')}${chalk.green.bold('generate files AST')}`);
    return new Promise((resolve) => {
      glob(this.config.src, async (err, files) => {
        let promises = [];
        files.forEach((filePath) => {
          console.log(`${chalk.yellow.bold('> [rtdoc] parse:')} ${filePath}`);
          promises.push(new Promise(async(parseResolve) => {
            let fileAST = await this.parseFileAST(filePath);
            let traversedFileAST = await this.traverseFileAST(fileAST);
            docsAst.push({
              file: filePath,
              route: filePath.replace(/\.js$/, '')
                .replace(/\./g, '')
                .replace(/\//g, '_')
                .replace(/^_/, ''),
              ast: traversedFileAST
            });
            parseResolve();
          }));
        });
        await Promise.all(promises);
        resolve(docsAst);
      });
    });
  }

  async parseFileAST(filePath) {

    let file = await loadFile(filePath);

    // use babel to transform file into AST
    // AST.program have names same as parsed file,
    // but we want to use original names as in non parsed file
    // that's why we have to use es2017 instead of es2015
    let parsed = transform(file, {
      babelrc: false,
      presets: [
        'es2017',
        'react',
        'stage-0'
      ],
      plugins: [
        'transform-runtime'
      ]
    });

    // Development:
    // there is a lot of data we don't need to use from AST
    // for development reasons we gonna remove those
    let unusedProp = ['loc', 'start', 'end', 'tokens', 'trailingComments'];
    let ast = (() => {
      let clearFunc = (obj) => {
        for (let prop in obj) {
          if (unusedProp.indexOf(prop) >= 0) {
            delete obj[prop];
          } else {
            if (obj[prop] !== null && typeof obj[prop] === 'object') {
              obj[prop] = clearFunc(obj[prop]);
            }
          }
        }
        return obj;
      };
      return clearFunc(parsed.ast);
    })();
    return ast;
  }

  async traverseFileAST(ast) {
    let body = ast.program.body;
    let at = new AstTraverse(body);
    return at.traverse();
  }

  generateTemplates(ast) {
    console.log(`${chalk.yellow.bold('> [rtdoc] ')}${chalk.green.bold('generate templates')}`);
    log(ast);
    let tg = new TplGenerator(ast);
    tg.compile();
  }

}

let rtDocs = RtDocs.create({
  src: './example_code/**/*.js',
  dist: './output'
});
rtDocs.start();
