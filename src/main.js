import esprima from 'esprima';
import { loadFile } from './utils';

class RtDocs {

  static create() {
    return new RtDocs();
  }

  constructor() {

  }

  async gen() {
    let file = await loadFile('example_code/demo.js');
    let parsedFile = esprima.parse(file, {
      jsx: true,
      comments: true
    });
    console.log(parsedFile);
  }

}

let rtDocs = RtDocs.create();
rtDocs.gen();