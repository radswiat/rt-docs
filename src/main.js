import esprima from 'esprima';
import { transform } from 'babel-core';
import chalk from 'chalk';

import { loadFile } from './utils';

class RtDocs {

  static create() {
    return new RtDocs();
  }

  constructor() {

  }

  async run() {
    // await this.genBabylon();
    await this.genEsprima();
  }

  async genBabylon() {
    // console.log(chalk.green('babylon'));
    // let file = await loadFile('example_code/demo.js');
    // let parsedFile = await babylon.parse(file, {
    //   sourceType: "module",
    //   plugins: [
    //     "jsx",
    //     "flow"
    //   ]
    // });
    // console.log(parsedFile);
  }

  async genEsprima() {
    console.log(chalk.green('esprima'));
    let file = await loadFile('example_code/demo.js');
    let parsed = transform(file, {
      babelrc: false,
      // compact: false,
      // minified: false,
      // moduleIds: true,
      // retainLines: true,
      // sourceMaps: true,
      presets: [
        "es2015",
        "react",
        "stage-0"
      ],
      plugins: [
        "transform-runtime"
      ]
    });
    // console.log(parsed.ast);
    console.log(parsed.ast);

    let tokens = parsed.ast.tokens;
    tokens.forEach((token, i) => {


      // find a comment block
      if(token.type === 'CommentBlock') {

        console.log(chalk.red('=============================================='));

        let secToken = tokens[i+1];
        let thToken = tokens[i+2];

        // handle class comment block
        if(secToken.type.label === 'class') {
          console.log(chalk.yellow('class'));
          console.log(`func name: ${thToken.value}`)
        }else

        // handle static comment block
        if(secToken.type.label === 'name' && secToken.value === 'static') {
          console.log(chalk.yellow('static'));
          console.log(`func name: ${thToken.value}`)
        }else

        if(secToken.type.label === 'name') {
          console.log(chalk.yellow('function'));
          console.log(`func name: ${secToken.value}`)
        }

      }
      // console.log('------');
      // console.log(token);
    })
  }

}

let rtDocs = RtDocs.create();
rtDocs.run();