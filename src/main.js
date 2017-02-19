import chalk from 'chalk';
import { transform } from 'babel-core';
import { loadFile, log } from './utils';
import optimist from 'optimist';
import AstTraverse from './ast-traverse/ast-traverse';

class RtDocs {

  static create() {
    return new RtDocs();
  }

  async run() {
    await this.genBabel();
  }

  async genBabel() {
    console.log(chalk.green('------- babel -------'));
    // load up js file
    let file = await loadFile('example_code/demo.js');

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
      }

      return clearFunc(parsed.ast);
    })();

    // Development:
    // store ast into the file
    // it makes reading a json much easier
    if (optimist.argv.log) {
      log(ast.program.body);
    }

    // we don't need anything but body
    let body = ast.program.body;
    new AstTraverse(body);
  }

}

let rtDocs = RtDocs.create();
rtDocs.run();
